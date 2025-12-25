// import { XMLParser } from "fast-xml-parser";

// export async function GET() {
//   try {
//     // const res = await fetch("https://ftr.fivefilters.net/makefulltextfeed.php?url=https://blog.rss.naver.com/gbhyang.xml");
//     const res = await fetch("https://blog.rss.naver.com/gbhyang.xml");
//     const xml = await res.text();

//     const parser = new XMLParser({ ignoreAttributes: false });
//     const json = parser.parse(xml);
//     const data = json.rss.channel;

//     return Response.json(data); // 클라이언트에 응답 보내기
//   } catch (error) {
//     console.error("RSS fetch 실패:", error);
//     return new Response("Error", { status: 500 });
//   }
// }
