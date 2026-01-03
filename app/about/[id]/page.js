"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useImageStore";

export default function AboutDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  const isAdmin = user && adminEmails.includes(user.email);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      setPost(data);
      setEditTitle(data.title);
      setEditContent(data.content);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title: editTitle,
        content: editContent,
      });

      setPost({ ...post, title: editTitle, content: editContent });
      setIsEditing(false);
      alert("수정 완료");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 실패");
    }
  };

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        alert("삭제 완료");
        router.push("/about");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 실패");
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          ← 뒤로가기
        </button>

        {isAdmin && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 px-3 py-1 rounded text-sm"
                >
                  저장
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 px-3 py-1 rounded text-sm"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-3xl font-bold mb-5 bg-gray-800 text-white px-3 py-2 rounded"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full whitespace-pre-wrap mb-8 bg-gray-800 text-white px-3 py-2 rounded h-64"
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-5">{post.title}</h1>
          <div className="whitespace-pre-wrap mb-8">{post.content}</div>
        </>
      )}

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
