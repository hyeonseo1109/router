"use client";

import { useState } from "react";
import { db, storage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function AdminWriteProduct() {
  const [category, setCategory] = useState("hanjiProduct");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // 1. 이미지 업로드
      const imageUrls = [];
      for (const image of images) {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      // 2. 상품 저장
      await addDoc(collection(db, "products"), {
        category,
        name,
        description,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      alert("저장 완료");
      router.push("/admin/products");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">상품 등록</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 카테고리 선택 */}
        <div>
          <label className="block font-medium mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          >
            <option value="hanjiProduct">한지공예 완제품</option>
            <option value="halfProduct">반제품 (골격)</option>
            <option value="hanji">전통 한지</option>
            <option value="materials">부자재</option>
            <option value="lamp">한지 조명</option>
            <option value="diy">만들기 세트 (DIY)</option>
            <option value="jangsuk">장석</option>
            <option value="moonyang">문양</option>
          </select>
        </div>

        {/* 상품명 */}
        <div>
          <label className="block font-medium mb-2">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
            required
          />
        </div>

        {/* 상품 설명 */}
        <div>
          <label className="block font-medium mb-2">상품 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black h-64"
            required
          />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block font-medium mb-2">이미지</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {images.length > 0 && (
            <p className="text-sm mt-2">{images.length}개 선택됨</p>
          )}
        </div>

        {/* 저장 버튼 */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  );
}
