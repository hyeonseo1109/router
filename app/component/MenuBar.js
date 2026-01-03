"use client";

import Link from "next/link";
import { useAuthStore, useMenuBar } from "../store/useImageStore";
import { VscChromeClose } from "react-icons/vsc";

export default function MenuBar() {
  const menuBar = useMenuBar((state) => state.menuBar);
  const setMenuBar = useMenuBar((state) => state.setMenuBar);
  const isLogined = useAuthStore((s) => s.isLogined);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // 어드민 여부 확인 (환경변수에서 이메일 목록 가져오기)
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  const isAdmin = user && adminEmails.includes(user.email);

  return (
    <>
      {menuBar && (
        <div className="bg-[#2d2d60ee] w-[12rem] min-h-screen fixed justify-end right-0 top-0 bottom-0 z-20 text-white ">
          <div className="flex flex-col w-full items-center justify-around h-full text-sm">
            <VscChromeClose
              className="fixed right-0 top-0 m-2"
              onClick={() => setMenuBar(false)}
            />

            <div className="flex flex-col w-full items-center gap-5">
              <div className="flex flex-col w-full items-center gap-5">
                <div className="text-[1.2rem] font-bold">한지공방 한지향</div>
                {isLogined ? (
                  <>
                    <Link href="/mypage" onClick={() => setMenuBar(false)}>
                      마이페이지
                    </Link>
                    {isAdmin && (
                      <>
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setMenuBar(false)}
                        >
                          글 목록
                        </Link>
                        <Link
                          href="/admin/write"
                          onClick={() => setMenuBar(false)}
                        >
                          글쓰기
                        </Link>
                        <Link
                          href="/admin/write-product"
                          onClick={() => setMenuBar(false)}
                        >
                          상품등록
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMenuBar(false);
                      }}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-5">
                    <Link href="/signin" onClick={() => setMenuBar(false)}>
                      로그인
                    </Link>
                    <Link href="/signup" onClick={() => setMenuBar(false)}>
                      회원가입
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full items-center gap-5">
                <div className="bg-[#3f3f7d] w-full h-0.5"></div>
                <Link href="/about" onClick={() => setMenuBar(false)}>
                  공방소개
                </Link>
                <Link href="/lamp" onClick={() => setMenuBar(false)}>
                  한지조명
                </Link>
                <Link href="/student" onClick={() => setMenuBar(false)}>
                  수강생모집
                </Link>
                <Link href="/gallery" onClick={() => setMenuBar(false)}>
                  갤러리
                </Link>
                <Link href="/notice" onClick={() => setMenuBar(false)}>
                  소식
                </Link>
              </div>
            </div>

            <div className="flex flex-col w-full items-center gap-5">
              <a
                href="https://blog.naver.com/gbhyang"
                target="_blank"
                rel="noopener noreferrer"
              >
                블로그 바로가기
              </a>
              <a
                href="https://cafe.daum.net/hanjinuri"
                target="_blank"
                rel="noopener noreferrer"
              >
                카페 바로가기
              </a>
              <a
                href="https://map.naver.com/p/entry/place/19444501?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202508122322&locale=ko&svcName=map_pcv5&searchType=place&lng=126.7585086&lat=37.6708802&c=14.67,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
              >
                찾아오시는 길
              </a>
              <div className="text-[0.8rem] text-[#ffffff9a] mx-2">
                <span>
                  경기 고양시 일산서구 중앙로 1455
                  <br />
                  대우시티프라자 317호
                  <br />( 031-911-9425 )
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
