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
                        </>: null }
                    </div>
            ))) : <div>정보를 불러올 수 없습니다.</div> 
        }
        </>
    )
}