"use client";

import { auth, signInWithEmailAndPassword } from "@/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "../../store/useImageStore";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const loginError = useAuthStore((s) => s.loginError);
  const setLoginError = useAuthStore((s) => s.setLoginError);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setLoginError(null);
      console.log("관리자 로그인 성공:", user.email);
      router.push("/admin/dashboard");
    } catch (error) {
      setLoginError(error.code);
      console.error("로그인 실패:", error.code);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <p className="text-2xl font-bold">관리자 로그인</p>
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <div className="flex flex-col w-[15rem] gap-2 items-center">
          <input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded-[0.3rem] px-2 py-1 w-full"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black rounded-[0.3rem] px-2 py-1 w-full"
          />
          <button
            type="submit"
            className="bg-[#3f3f3f] w-[7rem] rounded-md py-2 mt-2"
          >
            로그인
          </button>
        </div>
      </form>
      {loginError && <div className="text-red-500">{loginError}</div>}
    </div>
  );
}
