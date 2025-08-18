'use client';

import { useNoticeStore } from "@/app/store/useImageStore";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { VscArrowLeft } from "react-icons/vsc";


export default function Announce ({params}) {
  const {id} = params;
  const notice = useNoticeStore((state) => state.notice);
  const fetchNotice = useNoticeStore((state) => state.fetchNotice);
  const router = useRouter();

  useEffect(() => {
    if (notice.length === 0) {
      fetchNotice();
    }
  }, []); 

  const nt = notice.find((n) => String(n.id) === id);

  if (notice.length === 0) {
    return <p>존재하지 않는 공지입니다.</p>;
  }

  return (<div>
    <VscArrowLeft onClick={() => router.back()}/>
    <div className="flex flex-col items-center gap-5 py-5 px-3">
      <p className="bg-[#3e3e3e] px-5 text-[1.1rem] rounded-md">{nt.title}</p>
      <p className="w-full break-words whitespace-pre-line">{nt.description}</p>
      {nt.image && <img src={nt.image}/>}
    </div>
  </div>)
}

