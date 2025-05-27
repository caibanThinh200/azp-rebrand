"use client";

import { Product } from "@/sanity.types";
import { useParams } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const Template: FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();
  useEffect(() => {
    let recentProducts =
      JSON.parse(localStorage.getItem("recentProducts") || "") || [];
    if (
      !recentProducts
        ?.map((product: Product) => product?.slug?.current)
        .includes(params?.slug)
    ) {
        recentProducts = []
    }
  }, []);
  return <div>{children}</div>;
};

export default Template;
