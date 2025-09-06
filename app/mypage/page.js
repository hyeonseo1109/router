'use client';

import { useAuthListener, useAuthStore } from "../store/useImageStore";
import { VscAccount } from "react-icons/vsc";


export default function MyPage () {
  const user = useAuthStore((s)=>s.user)


  useAuthListener();
  console.log(user);

  return (
    <>
      <div>마이페이지</div>
      <div className="flex flex-col items-center gap-10">
        {user?.photoURL ? <img src={user.photoURL} className="w-[10rem] h-[10rem] rounded-full"/> : <VscAccount size={64} />}
        {user ? (
          user.displayName ? 
            <span>{user.displayName}님, 환영합니다!</span> : <span>{user.email.split("@")[0]}님, 환영합니다!</span>
        ) : <div>환영합니다!</div>}
      </div>
    </>
  )
}