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
        <div className='w-[20rem] h-[10rem]'>
            <Swiper
                className='w-[20rem] h-[10rem]'
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
                    <SwiperSlide key={card.id}>
                        <Link href={`/detail/${card.id}`} className='w-[20rem] h-[10rem] max-w-[20rem] min-w-[20rem] swiperImage'>{<img src={card.image} />}</Link>
                    </SwiperSlide>))}
            </Swiper>
        </div>
    );
}


