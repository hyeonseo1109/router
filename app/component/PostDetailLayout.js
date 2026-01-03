"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useImageStore";

/**
 * 게시글/상품 상세 페이지 공통 레이아웃
 * @param {string} collection - Firestore 컬렉션 이름 ("posts" 또는 "products")
 * @param {string} id - 문서 ID
 * @param {string} redirectPath - 삭제 후 리다이렉트 경로
 * @param {boolean} isNoticeStyle - 소식 스타일 적용 여부
 */
export default function PostDetailLayout({
  collection,
  id,
  redirectPath,
  isNoticeStyle = false,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  // 어드민 체크
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  const isAdmin = user && adminEmails.includes(user.email);

  // posts는 title/content, products는 name/description 사용
  const isProduct = collection === "products";
  const titleKey = isProduct ? "name" : "title";
  const contentKey = isProduct ? "description" : "content";

  useEffect(() => {
    fetchData();
  }, [id, collection]);

  const fetchData = async () => {
    try {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedData = { id: docSnap.id, ...docSnap.data() };
        setData(fetchedData);
        setEditTitle(fetchedData[titleKey] || "");
        setEditContent(fetchedData[contentKey] || "");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, collection, id);
      await updateDoc(docRef, {
        [titleKey]: editTitle,
        [contentKey]: editContent,
      });

      setData({ ...data, [titleKey]: editTitle, [contentKey]: editContent });
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
        await deleteDoc(doc(db, collection, id));
        alert("삭제 완료");
        router.push(redirectPath);
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 실패");
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!data) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 버튼 영역 */}
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

      {/* 제목/이름 & 내용/설명 */}
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={`w-full mb-5 bg-gray-800 text-white px-3 py-2 rounded ${
              isNoticeStyle
                ? "bg-[#3e3e3e] px-5 py-2 text-lg rounded-md"
                : "text-3xl font-bold"
            }`}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full whitespace-pre-wrap mb-8 bg-gray-800 text-white px-3 py-2 rounded h-64"
          />
        </>
      ) : (
        <>
          {isNoticeStyle ? (
            <div className="bg-[#3e3e3e] px-5 py-2 text-lg rounded-md mb-5 inline-block">
              {data[titleKey]}
            </div>
          ) : (
            <h1 className="text-3xl font-bold mb-5">{data[titleKey]}</h1>
          )}
          <div className="whitespace-pre-wrap mb-8">{data[contentKey]}</div>
        </>
      )}

      {/* 이미지들 */}
      {data.images && data.images.length > 0 && (
        <div className="flex flex-col gap-4">
          {data.images.map((img, idx) => (
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
