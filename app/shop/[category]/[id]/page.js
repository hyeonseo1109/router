"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useImageStore";

export default function ProductDetail({ params }) {
  const { category, id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  // 어드민 체크
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  const isAdmin = user && adminEmails.includes(user.email);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setProduct(data);
        setEditName(data.name || "");
        setEditDescription(data.description || "");
      }
    } catch (error) {
      console.error("상품 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: editName,
        description: editDescription,
      });

      setProduct({ ...product, name: editName, description: editDescription });
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
        await deleteDoc(doc(db, "products", id));
        alert("삭제 완료");
        router.push(`/shop/${category}`);
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 실패");
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 왼쪽: 이미지들 */}
        <div className="flex flex-col gap-4">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-full rounded-lg"
              />
            ))
          ) : (
            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">이미지 없음</span>
            </div>
          )}
        </div>

        {/* 오른쪽: 상품 정보 */}
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full text-3xl font-bold mb-4 bg-gray-800 text-white px-3 py-2 rounded"
                placeholder="상품명"
              />
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-400 mb-2">상품 설명</p>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full whitespace-pre-wrap bg-gray-700 text-white px-3 py-2 rounded h-64"
                  placeholder="상품 설명을 입력하세요"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-400 mb-2">상품 설명</p>
                <p className="whitespace-pre-wrap">{product.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
