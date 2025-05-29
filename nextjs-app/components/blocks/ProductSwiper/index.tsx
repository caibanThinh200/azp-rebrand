"use client";

import ProductCard from "@/components/ui/ProductCard";
import { Product, ProductSwiper as IProductSwiper } from "@/sanity.types";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductSwiperProps {
  block: Omit<IProductSwiper, "products"> & { products: Product[] };
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ block }) => {
  if((block?.products || [])?.length == 0) {
    return <></>
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-light-brown">{block?.title}</h2>
      <div>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
        >
          {block?.products?.map((product, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSwiper;
