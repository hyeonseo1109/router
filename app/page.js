'use client';

import ShoppingCategory from "./component/ShoppingCategory";
import SwiperImage from "./component/SwiperImage";



export default function Home() {
  return (
    <>
      <section className="flex">
        <SwiperImage/>
        <ShoppingCategory/>
      </section>
    </>
  );
}


