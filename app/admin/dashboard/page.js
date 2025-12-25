"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null); // 펼쳐진 글 ID
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(data);
  };

  const handleDelete = async (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", id));
      fetchPosts();
    }
  };

  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.category === filter);

  // 글 펼치기/접기
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">글 관리</h1>
        <Link
          href="/admin/write"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          새 글 쓰기
        </Link>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          전체
        </button>
        <button
          onClick={() => setFilter("intro")}
          className={
            filter === "intro"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          공방소개
        </button>
        <button
          onClick={() => setFilter("lighting")}
          className={
            filter === "lighting"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          한지조명
        </button>
        <button
          onClick={() => setFilter("recruit")}
          className={
            filter === "recruit"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          수강생모집
        </button>
        <button
          onClick={() => setFilter("gallery")}
          className={
            filter === "gallery"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          갤러리
        </button>
        <button
          onClick={() => setFilter("news")}
          className={
            filter === "news"
              ? "bg-blue-500 px-3 py-1 rounded"
              : "bg-gray-600 px-3 py-1 rounded"
          }
        >
          소식
        </button>
      </div>

      {/* 글 목록 */}
      <div className="flex flex-col gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-600 rounded-lg overflow-hidden"
          >
            {/* 제목 영역 */}
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800"
              onClick={() => toggleExpand(post.id)}
            >
              <div>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded mr-3">
                  {post.category}
                </span>
                <span className="text-lg font-medium">{post.title}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 펼치기 동작 방지
                    router.push(`/admin/edit/${post.id}`);
                  }}
                  className="bg-green-600 px-3 py-1 rounded text-sm"
                >
                  수정
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 펼치기 동작 방지
                    handleDelete(post.id);
                  }}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  삭제
                </button>
              </div>
            </div>

            {/* 내용 영역 (펼쳐졌을 때만 보임) */}
            {expandedId === post.id && (
              <div className="p-4 bg-gray-900 border-t border-gray-600">
                {/* 내용 */}
                <p className="whitespace-pre-wrap mb-4">{post.content}</p>

                {/* 이미지들 */}
                {post.images && post.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`이미지 ${idx + 1}`}
                        className="w-48 h-48 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-400 text-center py-8">글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
