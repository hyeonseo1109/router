export async function GET() {
    const notice = [
        { 
            id: 1, 
            title: "색이 변하는 LED등",
            description: "색이 변하는 LED등을 개발했어요~~^^",
            image: "/images/red.png",
        },
        { 
            id: 2, 
            title: "공방 리모델링",
            description: "공방 리모델링 했어요~ 멋있어진 공방 구경오세요~!",
            image: "/images/yellow.png",
        },
    ];

    return new Response(JSON.stringify(notice), {
        headers: { "Content-Type": "application/json" },
    })
    
}