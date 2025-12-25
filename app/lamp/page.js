"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Lamp() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("category", "==", "lighting")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    setPosts(data);
    setLoading(false);
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">한지조명</h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-10 my-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/lamp/${post.id}`}
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
      ) : (
        <div className="text-center text-gray-400 py-10">목록이 없습니다.</div>
      )}
    </div>
  );
}
