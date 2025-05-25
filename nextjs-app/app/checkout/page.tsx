"use client";

import { useForm } from "react-hook-form";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { urlForImage } from "@/sanity/lib/utils";
import { cn, formatVND } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Order } from "@/sanity.types";

type FormData = {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  message: string;
};

export default function CheckoutPage() {
  const { items, subtotal, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Shipping cost
  const shipping = 100000;

  // Tax calculation (assuming 8%)
  const tax = subtotal * 0.08;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const submitData: Pick<Order, "orderSummary" | "contact" | "_type"> = {
      _type: "order",
      contact: data,
      orderSummary: {
        tax,
        ship: shipping,
        total,
        subTotal: subtotal,
        products: items.map((item) => {
          const { color, quantity, _id, ...rest } = item;
          return {
            _key: _id,
            product: rest,
            quanity: quantity,
            price: rest?.discountPrice * quantity,
            color: color,
          };
        }),
      },
    };

    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(submitData),
    })
      // .then((res) => res.json())
      .then(() => {
        clearCart();
        router.push("/dat-hang-thanh-cong");
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-4">Sản phẩm</h2>
        <p className="text-gray-500 mb-6">
          Hãy quay lại để tìm thêm món đồ ưng ý
        </p>
        <Link href={"/"}>
          <Button className="bg-light-brown">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-10 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customer Information Form - Left Side */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-20 shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-6">Thông tin khách hàng</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    {...register("fullName", {
                      required: "Yêu cầu nhập họ tên",
                    })}
                    className={errors.fullName ? "border-red-500" : ""}
                    placeholder="Họ tên"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="address"
                    {...register("address", {
                      required: "Yêu cầu nhập địa chỉ",
                    })}
                    className={errors.address ? "border-red-500" : ""}
                    placeholder="Địa chỉ"
                    //   rows={3}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>{" "}
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Yêu cầu nhập số điện thoại",
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Số điện thoại không đúng định dạng",
                      },
                    })}
                    className={errors.phone ? "border-red-500" : ""}
                    placeholder="Số điện thoại"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Yêu cầu nhập email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không đúng định dạng",
                      },
                    })}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ghi chú (Không bắt buộc)
                </label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Ghi chú"
                  rows={4}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-light-brown rounded-20"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lí..." : "Thanh toán"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary - Right Side */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-20 shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-6">Thông tin đơn hàng</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-medium text-sm text-gray-700">
                Sản phẩm ({items.length})
              </h3>
              <div className="max-h-80 overflow-y-auto pr-2">
                {items.map((item, idx) => (
                  <div
                    key={item._id}
                    className={cn(
                      "flex items-start py-3 border-b border-gray-100",
                      idx < items.length - 1 && "border-b"
                    )}
                  >
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                      <Image
                        src={
                          urlForImage((item?.images || [])[0])?.url() ||
                          "/placeholder.svg"
                        }
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </span>
                        <span className="text-sm font-medium">
                          {formatVND(item.discountPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Details */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng sản phẩm</span>
                <span className="font-medium">{formatVND(subtotal)}</span>
              </div>

              {/* <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatVND(shipping)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatVND(tax)}</span>
              </div> */}

              {/* <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{formatVND(total)}</span>
              </div> */}
            </div>

            {/* Back to Cart */}
            <div className="mt-6 text-center">
              <Button className="w-full">
                <Link
                  href="/gio-hang"
                  className="flex gap-2 items-center text-sm"
                >
                  <ShoppingCart />
                  Quay về giỏ hàng
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
