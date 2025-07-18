"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import { urlForImage } from "@/sanity/lib/utils";
import { Hero as IHero } from "@/sanity.types";
import Link from "next/link";

const Hero: React.FC<{ block: IHero }> = ({ block }) => {
  return (
    <div className="rounded-20 overflow-hidden">
      <Swiper
        effect="fade"
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        className="lg:aspect-[3]"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop
        autoplay={{
          delay: 2000,
        }}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {(block?.sliders || []).map(
          (slider: Exclude<IHero["sliders"], undefined>[number]) => (
            <SwiperSlide key={slider?._key}>
              <Link
                target={slider?.openNewTab ? "_blank" : "_self"}
                href={slider?.link || "/"}
              >
                <Image
                  loading="eager"
                  className="size-full object-cover"
                  src={urlForImage(slider?.image)?.url() || ""}
                  alt={`Image ${slider?._key}`}
                  width={1200}
                  height={400}
                />
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default Hero;
