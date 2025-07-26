export async function GET() {
    const data = [
        { 
            id: 1, 
            name: "빨강",
            description: "빨강",
            image: "/images/red.png",
        },
        { 
            id: 2, 
            name: "노랑",
            description: "노랑",
            image: "/images/yellow.png",

        },
        { 
            id: 3, 
            name: "초록",
            description: "초록",
            image: "/images/green.png",
        },
        { 
            id: 4, 
            name: "파랑s",
            description: "파랑s",
            image: "/images/blue.png",
        },
        { 
            id: 5, 
            name: "보라",
            description: "보라",
            image: "/images/purple.png",
        },
    ];

    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    })
    
}