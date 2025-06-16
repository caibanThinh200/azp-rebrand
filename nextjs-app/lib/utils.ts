import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function isClientComponent() {
  return typeof window !== "undefined";
}

export function removeEmptyObject(obj: { [x: string]: any }) {
  if (typeof obj === "object" && obj !== null) {
    const newObj: { [x: string]: any } = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (
          value !== null &&
          typeof value === "object" &&
          Object.keys(value).length > 0
        ) {
          newObj[key] = removeEmptyObject(value);
        } else if (!!value) {
          newObj[key] = value;
        }
      }
    }
    return newObj;
  }
  return obj;
}
