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
        { 
            id: 3, 
            title: "김포공항 하트등 납품",
            description: "공방 리모델링 했어요~ 멋있어진 공방 구경오세요~!",
            image: "/images/green.png",
        },
        { 
            id: 4, 
            title: "4",
            description: "4",
            image: "/images/blue.png",
        },
        { 
            id: 5, 
            title: "5",
            description: "5",
            image: "/images/purple.png",
        },
        { 
            id: 6, 
            title: "6",
            description: "6",
        },
        { 
            id: 7, 
            title: "7",
            description: "7",
            image: "/images/yellow.png",
        },
        { 
            id: 8, 
            title: "8",
            description: "8",
            image: "/images/yellow.png",
        },
        { 
            id: 9, 
            title: "9",
            description: "9",
            image: "/images/yellow.png",
        },
        { 
            id: 10, 
            title: "10",
            description: "10",
            image: "/images/yellow.png",
        },
        { 
            id: 11, 
            title: "11",
            description: "11",
            image: "/images/yellow.png",
        },
        { 
            id: 12, 
            title: "12",
            description: "12",
            image: "/images/yellow.png",
        },
        { 
            id: 13, 
            title: "13",
            description: "13",
            image: "/images/yellow.png",
        },
        { 
            id: 14, 
            title: "14",
            description: "14",
            image: "/images/yellow.png",
        },
        { 
            id: 15, 
            title: "15",
            description: "15",
            image: "/images/yellow.png",
        },
        { 
            id: 16, 
            title: "16",
            description: "16",
            image: "/images/yellow.png",
        },
    ];

    return new Response(JSON.stringify(notice), {
        headers: { "Content-Type": "application/json" },
    })
    
}