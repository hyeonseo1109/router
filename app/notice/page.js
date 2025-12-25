"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Notice() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), where("category", "==", "news"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 최신순 정렬
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
      <h1 className="text-2xl font-bold mb-5">소식</h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/notice/${post.id}`}
              className="p-3 rounded-md bg-[#282828] hover:bg-[#343434]"
            >
              {post.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">목록이 없습니다.</div>
      )}
    </div>
  );
}
