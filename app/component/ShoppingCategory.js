export default function ShoppingCategory () {
    return (
        <>
            <div className="bg-black w-[35em] h-[21em] flex flex-col">
                <p className="text-white m-2">SHOPPING CATEGORY</p>
                <div className="flex flex-row h-full justify-around">
                    <section className="flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">한지공예 완제품</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">반제품 (골격)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">전통 한지</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">부자재</p>
                        </div>
                    </section >
                    <section className="flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">한지 조명</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">만들기 세트 (DIY)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">장석</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[gray] w-[5em] h-[3em]"></div>
                            <p className="text-white text-[0.8em]">문양</p>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}