'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { forwardRef } from "react";

const Carousel = forwardRef(function Carousel(props, ref) {
    const slides = [
        { src: "/images/ryza1.jpg", alt: "Slide 1" },
        { src: "/images/ryza2.jpg", alt: "Slide 2" },
        { src: "/images/ryza3.jpg", alt: "Slide 3" },
        { src: "/images/ryza4.jpg", alt: "Slide 4" }
    ]

    return (

        <div
        ref={ref} {...props}
         className="w-full max-w-[800px] h-[500px] mx-auto rounded-2xl">
            <header className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-3xl font-bold text-primary/90">Welcome</h1>
                <p className="text-primary/70 text-sm text-center">Compiled pictures, letters, favorite movies and songs.</p>
            </header>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                speed={1000} // ✅ transition duration 1s
                className="h-full rounded-2xl"
                style={{ transitionTimingFunction: "ease-in-out" }} // ✅ smooth easing
            >
                {slides.map(({ src, alt }, i) => (
                    <SwiperSlide key={i} className="relative h-full">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            priority={i === 0}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
})

export default Carousel;