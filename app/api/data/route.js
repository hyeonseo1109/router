import { db } from "@/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export async function GET() {
  try {
    // products 컬렉션에서 최신 상품 10개 가져오기
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);

    // 데이터가 없으면 빈 배열 반환
    if (snapshot.empty) {
      return Response.json([]);
    }

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data().images?.[0] || "", // 첫 번째 이미지
      description: doc.data().name || "",
    }));

    return Response.json(data);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    // 오류 발생 시 빈 배열 반환 (이렇게 하면 에러가 안 남)
    return Response.json([]);
  }
}
