'use client'

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper/modules';

const IMAGES = ["/images/placeholder-1.png", "/images/placeholder-2.png", "/images/placeholder-3.png"]

const Hero: React.FC = () => {
    return <div className="rounded-20 overflow-hidden">
        <Swiper
            effect='fade'
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            className='h-[400px]'
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                IMAGES.map((image, idx) => <SwiperSlide key={idx}>
                    <Image className='size-full object-cover' src={image} alt={`Image ${idx}`} width={1000} height={500} />
                </SwiperSlide>)
            }
        </Swiper>
    </div>
}

export default Hero;