import Link from "next/link";

export default function MenuBar () {
  return (<>
    <div className="bg-[#ffffff77] w-[30%] min-h-screen fixed justify-end right-0 top-0 bottom-0">
      <div className="flex flex-col w-full items-center justify-around h-full">
        <div className="flex flex-col w-full items-center gap-5">
          <div className="flex flex-col w-full items-center gap-5">
            <div className="text-[1.3rem] font-bold">한지공방 한지향</div>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
          <div className="flex flex-col w-full items-center gap-5">
            <div className="bg-[#373737] w-full h-0.5"></div>
            <Link href="/about">공방소개</Link>
            <Link href="/lamp">한지조명</Link>
            <Link href="/student">수강생모집</Link>
            <Link href="/gallery">갤러리</Link>
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-5">
          <a href="https://blog.naver.com/gbhyang" target="_blank"  rel="noopener noreferrer">블로그 바로가기</a>
          <a href="https://cafe.daum.net/hanjinuri" target="_blank"  rel="noopener noreferrer">카페 바로가기</a>
          <div className="text-sm">
            <span>경기 고양시 일산서구 중앙로 1455 
              <br/>대우시티프라자 317호
              <br/>( 031-911-9425 )</span>
          </div>
        </div>
      </div>
    </div>
    
  </>)
}