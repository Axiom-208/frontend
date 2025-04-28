export interface Category {
    id: string
    title: string
    description: string
    thumbnail: string
    videos: Video[]
}

export interface Video {
    id: number;
    url: string;
    title: string;
    topic: string;
    description: string;
    createdAt?: string;
}

export const videoCategories: Category[] = [
    {
        id: "physics",
        title: "Physics",
        description: "Explore the fundamental laws that govern our universe",
        thumbnail: "/placeholder.svg?height=400&width=600",
        videos: [
            {
                id: 1,
                url: "https://youtube.com/shorts/zkuCDT2p00Q?si=M11aEgPhVZ_GvaMH",
                title: "Introduction to Physics",
                description: "Learn about the fundamental principles of physics and how they apply to our everyday lives.",
                topic: "Physics",
            },
            {
                id: 2,
                url: "https://youtube.com/shorts/m5oyHpcE9pI?si=9fuyjGyJKo4mOXws",
                title: "Newton's Laws of Motion",
                description: "Understand the three laws that form the foundation of classical mechanics.",
                topic: "Physics",
            },
            {
                id: 3,
                url: "https://youtube.com/shorts/jhwvCKrUq9U?si=lgAfEBEt-mSiVuT0",
                title: "Quantum Physics Basics",
                description: "Dive into the strange world of quantum mechanics and particle behavior.",
                topic: "Physics",
            },
        ],
    },
    {
        id: "biology",
        title: "Biology",
        description: "Discover the science of life and living organisms",
        thumbnail: "/placeholder.svg?height=400&width=600",
        videos: [
            {
                id: 1,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                title: "Cell Biology Basics",
                description: "Explore the building blocks of life and understand how cells function in living organisms.",
                topic: "Biology",
            },
            {
                id: 2,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                title: "Human Anatomy",
                description: "Learn about the structure and organization of the human body.",
                topic: "Biology",
            },
            {
                id: 3,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                title: "Genetics and DNA",
                description: "Understand how genetic information is stored, expressed, and passed on.",
                topic: "Biology",
            },
        ],
    },
    {
        id: "history",
        title: "History",
        description: "Journey through time and explore human civilization",
        thumbnail: "/placeholder.svg?height=400&width=600",
        videos: [
            {
                id: 1,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                title: "Ancient Civilizations",
                description:
                    "Journey through time to discover the fascinating cultures and achievements of ancient civilizations.",
                topic: "History",
            },
            {
                id: 2,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                title: "The Renaissance Period",
                description: "Explore the cultural rebirth that bridged the gap between the Middle Ages and modern history.",
                topic: "History",
            },
            {
                id: 3,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                title: "World War II",
                description:
                    "Understand the causes, events, and consequences of the most devastating conflict in human history.",
                topic: "History",
            },
        ],
    },
    {
        id: "mathematics",
        title: "Mathematics",
        description: "Master the language of numbers and patterns",
        thumbnail: "/placeholder.svg?height=400&width=600",
        videos: [
            {
                id: 1,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                title: "Algebra Fundamentals",
                description: "Master the essential concepts of algebra that form the foundation of advanced mathematics.",
                topic: "Mathematics",
            },
            {
                id: 2,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                title: "Geometry Basics",
                description: "Learn about shapes, sizes, and the properties of space.",
                topic: "Mathematics",
            },
            {
                id: 3,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                title: "Calculus Introduction",
                description: "Understand the fundamentals of calculus and its applications in solving real-world problems.",
                topic: "Mathematics",
            },
        ],
    },
]

