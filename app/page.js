'use client';

import ShoppingCategory from "./component/ShoppingCategory";
import SwiperImage from "./component/SwiperImage";



export default function Home() {
  return (
    <>
      <section className="flex max-[900px]:flex-col gap-5">
        <SwiperImage/>
        <ShoppingCategory/>
      </section>
    </>
  );
}


