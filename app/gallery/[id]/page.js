"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function GalleryDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost({ id: docSnap.id, ...docSnap.data() });
    }
    setLoading(false);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-5 text-gray-400 hover:text-white"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-3xl font-bold mb-5">{post.title}</h1>

      <div className="whitespace-pre-wrap mb-8">{post.content}</div>

      {/* 이미지들 */}
      {post.images && post.images.length > 0 && (
        <div className="flex flex-col gap-4">
          {post.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`이미지 ${idx + 1}`}
              className="w-full rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
