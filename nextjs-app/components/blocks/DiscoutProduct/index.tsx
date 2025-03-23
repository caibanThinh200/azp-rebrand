'use client'

import ProductCard from "@/components/ui/ProductCard"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"

const ProductSwiper = () => {
    return <div className="flex flex-col gap-10">
        <h2 className="text-light-brown">Sản phẩm khuyến mãi</h2>
        <div>
            <Swiper slidesPerView={1} breakpoints={{
                360: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 4
                }
            }} spaceBetween={20}>
                {Array(8).fill("").map((_, idx) => <SwiperSlide key={idx}>
                    <ProductCard />
                </SwiperSlide>)}
            </Swiper>
        </div>
    </div>
}

export default ProductSwiper