"use client";

import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useImageStore";

export default function HanjiProduct() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLogined = useAuthStore((s) => s.isLogined);
  const setUser = useAuthStore((s) => s.setUser);
  const signupError = useAuthStore((s) => s.signupError);
  const setSignupError = useAuthStore((s) => s.setSignupError);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      router.push("/");
    } catch (error) {
      console.error("구글로그인:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setSignupError(null);
      router.push("/"); // 홈으로 이동
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setSignupError(error.message);
    }
  };

  //로그인상태 유지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log("Hello", user.displayName);
      }
    });
    return () => unsubscribe(); // 컴포넌트 언마운트 시 클린업
  }, [setUser]);

  return (
    <>
      <p>회원가입</p>
      <div className="flex flex-col items-center justify-center gap-5 h-[10rem]">
        <form className="flex flex-col items-center" onSubmit={handleSignup}>
          <div className="flex flex-col w-[15rem] gap-2 items-center">
            <input
              placeholder="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black rounded-[0.3rem] px-1"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black rounded-[0.3rem] px-1"
            />
            <button type="submit" className="bg-[#3f3f3f] w-[7rem] rounded-md">
              회원가입
            </button>
          </div>
        </form>
        <div>{signupError}</div>
        <button
          className="bg-[#0c67df] w-[7rem] rounded-md"
          onClick={handleGoogleSignIn}
        >
          구글 로그인
        </button>
      </div>
    </>
  );
}
