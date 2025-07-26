'use client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';
import { useImageStore } from '../store/useImageStore';

export default function SwiperImage() {
    const cards = useImageStore((s) => s.cards)
    const fetchCards = useImageStore((s) => s.fetchCards);
    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <>
            <Swiper
                className='w-[20em] h-[10em]'
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
                    //사용자가 컨트롤바로 이동시킨 후에도 자동전환 진행
                }}
            >

                {cards.map((card) => (
                    <SwiperSlide>
                        <Link href={`/detail/${card.id}`} className='w-[20em] h-[10em] max-w-[20em] min-w-[20em]'>{<img src={card.image} />}</Link>
                    </SwiperSlide>))}
            </Swiper>
        </>
    );
}


