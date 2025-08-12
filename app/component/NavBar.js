'use client';

import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { useMenuBar } from "../store/useImageStore";
import MenuBar from "./MenuBar";



export default function NavBar () {
  const setMenuBar = useMenuBar( (state) => state.setMenuBar)
  return ( <>
    <nav className="flex justify-between bg-[#1c1c2b] my-5 rounded-lg mx-5 h-[3rem] w-auto items-center p-3 text-white text-[0.9rem]">
            <div className="flex gap-6 items-center">
              <Link href="/" className="text-[1.2rem]">한지공방 한지향</Link>
              <Link href="/about">공방소개</Link>
              <Link href="/lamp">한지조명</Link>
              <Link href="/student">수강생모집</Link>
              <Link href="/gallery">갤러리</Link>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-6 items-center">
                <Link href="/signin">로그인</Link>
                <Link href="/signup">회원가입</Link>
              </div>
            <IoMenu onClick={setMenuBar(p => !p)}/>
            </div>
          </nav>
          <MenuBar />
  </>)
}