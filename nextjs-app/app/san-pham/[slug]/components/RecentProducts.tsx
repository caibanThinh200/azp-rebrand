"use client";

import ProductSwiper from "@/components/blocks/ProductSwiper";
import { GetProductDetailQueryResult, Product } from "@/sanity.types";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface RecentProductsProps {
  product: GetProductDetailQueryResult;
}

const RecentProducts: FC<RecentProductsProps> = ({ product }) => {
  const params = useParams();
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    let recentProducts = localStorage.getItem("recentProducts")
      ? JSON.parse(localStorage.getItem("recentProducts") || "")
      : [];
    if (
      !recentProducts
        ?.map((product: Product) => product?.slug?.current)
        .includes(params?.slug)
    ) {
      recentProducts = [
        product,
        ...recentProducts?.filter(
          (productItem: Product) => product?._id !== productItem?._id
        ),
      ];
    }
    localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
    setRecentProducts(recentProducts);
  }, []);

  return (
    <div className="mt-10">
      <ProductSwiper
        block={{
          title: "Sản phẩm đã xem",
          _type: "productSwiper",
          products: recentProducts,
        }}
      />
    </div>
  );
};

export default RecentProducts;
