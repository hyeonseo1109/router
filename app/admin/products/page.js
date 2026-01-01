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

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();

  const categories = [
    { id: "hanjiProduct", name: "한지공예 완제품" },
    { id: "halfProduct", name: "반제품 (골격)" },
    { id: "hanji", name: "전통 한지" },
    { id: "materials", name: "부자재" },
    { id: "lamp", name: "한지 조명" },
    { id: "diy", name: "만들기 세트 (DIY)" },
    { id: "jangsuk", name: "장석" },
    { id: "moonyang", name: "문양" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : id;
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">상품 관리</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/dashboard"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            글 관리
          </Link>
          <Link
            href="/admin/write-product"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            새 상품 등록
          </Link>
        </div>
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
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={
              filter === cat.id
                ? "bg-blue-500 px-3 py-1 rounded"
                : "bg-gray-600 px-3 py-1 rounded"
            }
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 상품 목록 */}
      <div className="flex flex-col gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-600 rounded-lg overflow-hidden"
          >
            {/* 제목 영역 */}
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800"
              onClick={() => toggleExpand(product.id)}
            >
              <div>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded mr-3">
                  {getCategoryName(product.category)}
                </span>
                <span className="text-lg font-medium">{product.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/edit-product/${product.id}`);
                  }}
                  className="bg-green-600 px-3 py-1 rounded text-sm"
                >
                  수정
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  삭제
                </button>
              </div>
            </div>

            {/* 내용 영역 */}
            {expandedId === product.id && (
              <div className="p-4 bg-gray-900 border-t border-gray-600">
                <p className="whitespace-pre-wrap mb-4">
                  {product.description}
                </p>

                {product.images && product.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.images.map((img, idx) => (
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

        {filteredProducts.length === 0 && (
          <p className="text-gray-400 text-center py-8">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
