"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopCategory({ params }) {
  const { category } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const categoryNames = {
    hanjiProduct: "한지공예 완제품",
    halfProduct: "반제품 (골격)",
    hanji: "전통 한지",
    materials: "부자재",
    lamp: "한지 조명",
    diy: "만들기 세트 (DIY)",
    jangsuk: "장석",
    moonyang: "문양",
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
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

      setProducts(data);
    } catch (error) {
      console.error("상품 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          ← 뒤로가기
        </button>
        <h1 className="text-2xl font-bold">
          {categoryNames[category] || category}
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${category}/${product.id}`}
              className="border border-gray-600 rounded-lg overflow-hidden hover:bg-gray-800"
            >
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">이미지 없음</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">{product.name}</h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">상품이 없습니다.</div>
      )}
    </div>
  );
}
