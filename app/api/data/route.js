import { db } from "@/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export async function GET() {
  try {
    // products 컬렉션에서 최신 상품 5개 가져오기
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return Response.json([]);
    }

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data().images?.[0] || "",
      description: doc.data().name || "",
    }));

    return Response.json(data);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    // 오류 발생 시 빈 배열 반환
    return Response.json([]);
  }
}
