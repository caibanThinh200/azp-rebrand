"use client";

import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Product, ProductSwiper as IProductSwiper } from "@/sanity.types";
import {
  ArrowBigLeft,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ISwiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductSwiperProps {
  block: Omit<IProductSwiper, "products"> & { products: Product[] };
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ block }) => {
  const [swiper, setSwiper] = useState<ISwiper>();

  const handleNextSlide = () => {
    swiper?.slideNext();
  };

  const handlePrevSlide = () => {
    swiper?.slidePrev();
  };

  if ((block?.products || [])?.length == 0) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-light-brown">{block?.title}</h2>
        <div className="flex gap-3 items-center">
          <Button onClick={handlePrevSlide}>
            <ArrowLeft />
          </Button>
          <Button onClick={handleNextSlide}>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div>
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          breakpoints={{
            360: {
              slidesPerView: 2,
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
