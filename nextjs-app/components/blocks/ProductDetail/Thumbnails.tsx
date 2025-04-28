"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { urlForImage } from "@/sanity/lib/utils";

interface ProductThumbnailProps {
  images: SanityImage[];
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-20 overflow-hidden bg-white p-2 shadow-lg">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product-swiper w-full rounded-20"
        >
          {images.map((image) => (
            <SwiperSlide key={image._key as string}>
              <div className="aspect-square relative size-full h-auto min-h-[400px]">
                <Image
                  src={urlForImage(image)?.url() as string}
                  alt={`image ${image?._key}` as string}
                  width={image?.hotspot?.width || 300}
                  height={image?.hotspot?.height || 300}
                  className="object-cover w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="rounded-20 p-2 bg-white shadow-lg">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="thumbs-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image?._key as string}>
              <div className="aspect-square relative cursor-pointer border rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={urlForImage(image)?.url() as string}
                  alt={`image ${image?._key}` as string}
                  width={image?.hotspot?.width || 100}
                  height={image?.hotspot?.height || 100}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductThumbnail;
