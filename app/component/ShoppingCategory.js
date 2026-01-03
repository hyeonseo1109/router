import Link from "next/link";

export default function ShoppingCategory() {
  return (
    <>
      <div className="bg-black w-[100%] h-[21rem] flex flex-col">
        <p className="text-white m-2">SHOPPING CATEGORY</p>
        <div className="flex flex-row h-full justify-around mx-5">
          <section className="flex flex-col justify-between">
            <Link href="/shop/hanjiProduct" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">한지공예 완제품</p>
            </Link>
            <Link href="/shop/halfProduct" className="flex items-center gap-2">
              <img
                src="/images/purple.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">반제품 (골격)</p>
            </Link>
            <Link href="/shop/hanji" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">전통 한지</p>
            </Link>
            <Link href="/shop/boo" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">부자재</p>
            </Link>
          </section>
          <section className="flex flex-col justify-between">
            <Link href="/shop/lamp" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">한지 조명</p>
            </Link>
            <Link href="/shop/diy" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">만들기 세트 (DIY)</p>
            </Link>
            <Link href="/shop/jangsuk" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">장석</p>
            </Link>
            <Link href="/shop/moonyang" className="flex items-center gap-2">
              <img
                src="/images/blue.png"
                className="bg-[gray] w-[5rem] h-[3rem]"
              ></img>
              <p className="text-white text-[0.8rem]">문양</p>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
