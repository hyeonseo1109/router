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
            <div className="flex flex-col gap-10 my-5">
            {bordItems.length >0 ? ( 
                bordItems.map((it, idx)=> (
                    <div 
                        key={idx}
                        className="w-full text-[1rem] border"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="text-[1.2rem]">{it.title}</div>
                            {it.description.indexOf("<img")!==-1 ? <>
                            <img 
                                src={`/api/image-proxy?url=${encodeURIComponent(it.description.split('src="')[1].split('"')[0].trim().replace('blogthumb', 'postfiles')+"?type=w966")}`}
                                alt="블로그 이미지"
                                // className="object-contain w-full"
                                // className="aspect-auto h-[20rem]"
                                />
                            <div>{it.description.split('<img')[0]}</div>
                            {/*
                            ---이미지 비율 이상함

                            https://blogthumb.pstatic.net/MjAxOTA1MDlfMjUz/MDAxNTU3NDA4Nzc1ODU0.a-izj2xFy4Tn5lgRYYuSGmTCCWlawQy5ToD92hof2iUg.tZR68GMtpAXPzQ36ncFVQx_td8qPfoBYAuDlBSBN8aYg.JPEG.gbhyang/경인_평화22.jpg
                            에서 blogthumb를 postfiles로 대치, 
                            맨 뒤에 ?type=w966 붙이기

                            url.replace('blogthumb', 'postfiles')
                            url 뒷부분 파라미터 추가


                            ---화면 밑에 부분 하얗게 뜨는 거 */}

                            </>: null }
                        </div>
                    </div>
            ))) : <div>정보를 불러올 수 없습니다.</div> 
        }
        </div>
        </>
    )
}