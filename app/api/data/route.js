export async function GET() {
    const data = [
        { 
            id: 1, 
            name: "빨강",
            description: "빨강",
            image: "/images/bonobono.png",
        },
        { 
            id: 2, 
            name: "노랑",
            description: "노랑",
            image: "/images/babyShark.png",

        },
        { 
            id: 3, 
            name: "초록",
            description: "초록",
            image: "/images/pikmin.png",
        },
        { 
            id: 4, 
            name: "파랑s",
            description: "파랑s",
            image: "/images/ddegulLeo.png",
        },
        { 
            id: 5, 
            name: "보라",
            description: "보라",
            image: "/images/adultShark.png",
        },
    ];

    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    })
    
}