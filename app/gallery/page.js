"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Gallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">갤러리</h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-10 my-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/gallery/${post.id}`}
              className="border border-gray-600 p-4 rounded-lg hover:bg-gray-800"
            >
              <div className="text-xl font-medium mb-3">{post.title}</div>

              {/* 첫 번째 이미지만 미리보기 */}
              {post.images && post.images.length > 0 && (
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded mb-3"
                />
              )}

              {/* 내용 미리보기 (100자) */}
              <p className="text-gray-400 line-clamp-3">
                {post.content.substring(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">목록이 없습니다.</div>
      )}
    </div>
  );
}
