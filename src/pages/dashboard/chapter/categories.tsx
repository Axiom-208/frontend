import {useState} from "react"
import CategorySelector from "@/components/pages/video-categories/category-selector.tsx";
import VideoPlayer from "@/components/pages/video-categories/video-player.tsx";


// Video categories with their respective videos
const videoCategories = [
    {
        id: "physics",
        title: "Physics",
        description: "Explore the fundamental laws that govern our universe",
        thumbnail: "/placeholder.svg?height=400&width=600",
        videos: [
            {
                id: 1,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                title: "Introduction to Physics",
                description: "Learn about the fundamental principles of physics and how they apply to our everyday lives.",
                topic: "Physics",
            },
            {
                id: 2,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                title: "Newton's Laws of Motion",
                description: "Understand the three laws that form the foundation of classical mechanics.",
                topic: "Physics",
            },
            {
                id: 3,
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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

export default function Videos() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Find the selected category object
    const currentCategory = selectedCategory ? videoCategories.find((category) => category.id === selectedCategory) : null

    return (
        <div className="bg-zinc-50">
            {!selectedCategory ? (
                <CategorySelector categories={videoCategories} onSelectCategory={setSelectedCategory}/>
            ) : (
                <VideoPlayer
                    videos={currentCategory?.videos || []}
                    categoryTitle={currentCategory?.title || ""}
                    onBack={() => setSelectedCategory(null)}
                />
            )}
        </div>
    )
}
