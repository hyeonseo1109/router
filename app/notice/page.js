'use client';

import { useEffect } from "react"
import { useNoticeStore } from "../store/useImageStore"
import Link from "next/link";

export default function () {
  const fetchNotice = useNoticeStore((state) => state.fetchNotice)
  const notice = useNoticeStore((state) => state.notice)
  useEffect( () => {
    fetchNotice()
  }, [])
  return (<>
    <span>공지사항</span>
    <div className="flex flex-col">
      {notice.map((nt)=> (
        <Link 
          key={nt.id}
          href={`/announce/${nt.id}`}>{nt.title}</Link>
      ))}
    </div>

  </>)
}