"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const { category, id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({ id: docSnap.id, ...docSnap.data() });
    }
    setLoading(false);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-5 text-gray-400 hover:text-white"
      >
        ← 뒤로가기
      </button>

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
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-400 mb-2">상품 설명</p>
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
