export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Image URL is required", { status: 400 });
  }

  try {
    const imageRes = await fetch(url);
    
    if (!imageRes.ok) {
      return new Response("Failed to fetch image", { status: 500 });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const buffer = await imageRes.arrayBuffer();
    const decodedUrl = decodeURIComponent(url);
    console.log("Fetching image from:", decodedUrl);  

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return new Response("Error fetching image", { status: 500 });
  }
}
