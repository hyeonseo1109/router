'use client';

import { useEffect } from "react";
import { useBlog } from "../store/useImageStore";

export default function About () {
    const blogContent = useBlog((s) => s.blogContent)
    const fetchBlogContent = useBlog((s) => s.fetchBlogContent);

    useEffect(() => {
        fetchBlogContent();
    }, []);

    const items = blogContent?.item ?? [];

    const bordItems = items.filter((item)=>item.category ==='갤러리')
    if (blogContent) {
        console.log(bordItems);
    }

    return (
        <>
            <h1>갤러리</h1>
            {bordItems ? (
                bordItems.map((it, idx)=> (
                    <div 
                        key={idx}
                        className="borde w-full text-[1rem]"
                    >
                        <div>{it.title}</div>
                        {/* <div>{it.description}</div> */}
                        {it.description.indexOf("<img")!==-1 ? <>
                        <div>{it.description.split('<img')[0]}</div>
                        {/* <div className="text-red-500">{it.description.split('src=\"')[1].split('\\"')}</div> */}
                        <img 
                            src={`/api/image-proxy?url=${encodeURIComponent(it.description.split('src="')[1].split('"')[0].trim())}`}
                            alt="블로그 이미지"
                            className="w-[10rem] h-auto block"
                        />
                        {/*
                        ---이미지 비율 이상함
                        ---글 너무 길면 잘림
                        ---첫 번째 이미지를 기준으로 뒤에는 잘림
                        ---화면 밑에 부분 하얗게 뜨는 거 */}

                        </>: null }
                    </div>
            ))) : <div>정보를 불러올 수 없습니다.</div> 
        }
        </>
    )
}