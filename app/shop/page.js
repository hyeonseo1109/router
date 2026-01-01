"use client";

import Link from "next/link";

export default function Shop() {
  const categories = [
    {
      id: "hanjiProduct",
      name: "한지공예 완제품",
      desc: "전통 한지로 만든 완제품",
    },
    { id: "halfProduct", name: "반제품 (골격)", desc: "조립 가능한 반제품" },
    { id: "hanji", name: "전통 한지", desc: "다양한 전통 한지" },
    { id: "materials", name: "부자재", desc: "한지공예 부자재" },
    { id: "lamp", name: "한지 조명", desc: "한지로 만든 조명" },
    { id: "diy", name: "만들기 세트 (DIY)", desc: "직접 만들 수 있는 세트" },
    { id: "jangsuk", name: "장석", desc: "전통 장석" },
    { id: "moonyang", name: "문양", desc: "전통 문양" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">쇼핑몰</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.id}`}
            className="border border-gray-600 p-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="bg-gray-700 w-full h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">이미지 영역</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
            <p className="text-gray-400 text-sm">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
