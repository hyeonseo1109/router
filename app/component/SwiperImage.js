"use client";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { useImageStore } from "../store/useImageStore";

export default function SwiperImage() {
  const cards = useImageStore((s) => s.cards);
  const fetchCards = useImageStore((s) => s.fetchCards);

  useEffect(() => {
    fetchCards();
  }, []);

  // 데이터가 없으면 "상품 준비중" 메시지 표시
  if (cards.length === 0) {
    return (
      <div className="w-[30rem] aspect-[2/1] max930:w-auto max1200:w-[25rem] flex items-center justify-center bg-gray-800 rounded-lg">
        <p className="text-gray-400">상품 준비중입니다</p>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        className="w-[30rem] aspect-[2/1] max930:w-auto max1200:w-[25rem]"
        modules={[Navigation, Scrollbar, Autoplay]}
        spaceBetween={200}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        centeredSlides={true}
        effect="cards"
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <Link href={`/detail/${card.id}`}>
              <img src={card.image} alt={card.description || "상품 이미지"} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
