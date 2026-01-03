"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Gallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // 페이지당 글 개수

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("category", "==", "gallery"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(data);
    setLoading(false);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">갤러리</h1>

      {posts.length > 0 ? (
        <>
          <div className="flex flex-col gap-10 my-5">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/gallery/${post.id}`}
                className="border border-gray-600 p-4 rounded-lg hover:bg-gray-800"
              >
                <div className="text-xl font-medium mb-3">{post.title}</div>

                {post.images && post.images.length > 0 && (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded mb-3"
                  />
                )}

                <p className="text-gray-400 line-clamp-3">
                  {post.content.substring(0, 100)}...
                </p>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* 이전 버튼 */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>

              {/* 페이지 번호 */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* 다음 버튼 */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 py-10">목록이 없습니다.</div>
      )}
    </div>
  );
}
