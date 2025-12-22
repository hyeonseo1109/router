"use client";

import { useState } from "react";
import { db, storage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function AdminWrite() {
  const [category, setCategory] = useState("gallery");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // 이미지 파일 선택
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // 저장 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // 1. 이미지 업로드 (Storage에)
      const imageUrls = [];
      for (const image of images) {
        const storageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      // 2. 글 저장 (Firestore에)
      await addDoc(collection(db, "posts"), {
        category,
        title,
        content,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      alert("저장 완료");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">글 작성</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 카테고리 선택 */}
        <div>
          <label className="block font-medium mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          >
            <option value="intro">공방소개</option>
            <option value="lighting">한지조명</option>
            <option value="recruit">수강생모집</option>
            <option value="gallery">갤러리</option>
            <option value="news">소식</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label className="block font-medium mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block font-medium mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
