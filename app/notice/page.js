'use client';

import { useEffect, useState } from "react"
import { useNoticeStore } from "../store/useImageStore"
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";
import { VscArrowRight } from "react-icons/vsc";

export default function () {
  
  const fetchNotice = useNoticeStore((state) => state.fetchNotice)
  const notice = useNoticeStore((state) => state.notice)
  useEffect( () => {
    fetchNotice()
  }, [fetchNotice])
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notice.length / 5);
  const currentNotice = notice.slice(
    (currentPage -1) *5, currentPage*5
  )
  return (<div className="flex flex-col gap-5">
    <span>공지사항</span>
    <div className="flex flex-col gap-2">
      {currentNotice.map((nt)=> (
        <Link 
          key={nt.id}
          href={`/announce/${nt.id}`}
          className={`${Number(nt.id)%2===0 ? 'bg-[#282828]': 'bg-[#343434]'}`}
        >
          {nt.title}
        </Link>
      ))}
    </div>
    <div className="flex justify-between w-full mt-5 mb-2">
      <VscArrowLeft 
        disabled={currentPage === 1}
        onClick={()=> setCurrentPage(currentPage-1)}
        className={`${currentPage===1 && 'opacity-30 pointer-events-none'}`}
      />
      <span className="text-sm text-gray-400">
          {currentPage} / {totalPages}
        </span>
      <VscArrowRight 
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`${currentPage===totalPages && 'opacity-30 pointer-events-none'}`}
      />
    </div>

  </div>)
}