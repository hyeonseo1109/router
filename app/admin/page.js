"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useAuthListener } from "../store/useImageStore";

export default function AdminMain() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLogined = useAuthStore((s) => s.isLogined);

  useAuthListener();

  useEffect(() => {
    // 로그인 안 되어 있으면 로그인 페이지로
    if (!isLogined) {
      router.push("/admin/signin");
    } else {
      // 로그인 되어 있으면 대시보드로
      router.push("/admin/dashboard");
    }
  }, [isLogined, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>로딩 중...</p>
    </div>
  );
}
