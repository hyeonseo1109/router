'use client';

import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { useAuthListener, useAuthStore, useMenuBar } from "../store/useImageStore";
import MenuBar from "./MenuBar";
import { useEffect } from "react";



export default function NavBar () {
  const setMenuBar = useMenuBar( (state) => state.setMenuBar)
  const isLogined = useAuthStore((s)=>s.isLogined)

  useAuthListener();

  return ( <>
    <nav className="flex justify-between bg-[#1c1c2b] my-5 rounded-lg mx-5 h-[3rem] w-auto items-center p-3 text-white text-[0.9rem]">
            <div className="flex gap-6 items-center">
              <Link href="/" className="text-[1.2rem]">한지공방 한지향</Link>
              <Link href="/about" className="max930:hidden">공방소개</Link>
              <Link href="/lamp" className="max930:hidden">한지조명</Link>
              <Link href="/student" className="max930:hidden">수강생모집</Link>
              <Link href="/gallery" className="max930:hidden">갤러리</Link>
              <Link href="/notice" className="max930:hidden">소식</Link>
            </div>
            <div className="flex gap-6 items-center">
              {isLogined ? null : <div className="flex gap-6 items-center max930:hidden">
                <Link href="/signin">로그인</Link>
                <Link href="/signup">회원가입</Link>
              </div>}
              <div className="hidden justify-end w-full max930:block">
                <IoMenu 
                  onClick={() => {
                    setMenuBar(true)
                  }}/>
              </div>
            </div>
          </nav>
          <MenuBar />
  </>)
}