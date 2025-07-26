"use client";

import { useImageStore } from "@/app/store/useImageStore";
import { useEffect } from "react";



export default function Detail ({params}) {
    const {id} = params;
    const cards = useImageStore((state) => state.cards);
    const fetchCards = useImageStore((state) => state.fetchCards);

    useEffect(() => {
        if (cards.length === 0) {
            fetchCards();
        }
    }, []);

    const card = cards.find((c) => String(c.id) === id);

    return (
        <>
            {card ? (
                <>
                    <div className="h-[150px] m-[15px] bg-black"></div>
                    {card.description}
                </>
            ) : <h1>상품을 찾을 수 없습니다.</h1>}
        </>
    )
}

