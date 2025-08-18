'use client';

import { auth, provider, signInWithPopup } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function hanjiProduct () {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("로그인 성공:", user.displayName);

      router.push("/");
    } catch (error) {
      console.error("구글로그인:", error);
    }
  };


  //로그인상태 유지
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("현재 로그인한 유저:", user.displayName);
    } else {
      console.log("로그아웃 상태");
    }
  });

  return () => unsubscribe(); // 컴포넌트 언마운트 시 클린업
}, []);

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 기본 제출 막기 (새로고침 방지)
  }


  return (<>
    <p>로그인</p>
    <div className="flex flex-col items-center justify-center gap-5 h-[10rem]">
      <form 
        className="flex flex-col items-center"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col w-[15rem] gap-2 items-center">
          <input 
            placeholder="아이디" 
            className="text-black rounded-[0.3rem] px-1"/>
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="text-black rounded-[0.3rem] px-1"/>
          <button type="submit" className="bg-[#3f3f3f] w-[7rem] rounded-md">로그인</button>
        </div>
      </form>
      <button 
        className="bg-[#0c67df] w-[7rem] rounded-md"
        onClick={handleGoogleSignIn}
      >구글 로그인</button>
    </div>
  </>)
}