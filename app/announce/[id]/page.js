'use client';

import { useNoticeStore } from "@/app/store/useImageStore";
import { useEffect } from "react";

export default function Announce ({params}) {
  const {id} = params;
  const notice = useNoticeStore((state) => state.notice);
  const fetchNotice = useNoticeStore((state) => state.fetchNotice);

  useEffect(() => {
    if (notice.length === 0) {
      fetchNotice();
    }
  }, []); 

  const nt = notice.find((n) => String(n.id) === id);

  if (notice.length === 0) {
    return <p>존재하지 않는 공지입니다.</p>;
  }

  return (<>
    <div className="flex flex-col items-center gap-5 py-5">
      <p>{nt.title}</p>
      <p>{nt.description}</p>
    </div>
  </>)
}

