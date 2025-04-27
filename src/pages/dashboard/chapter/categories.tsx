import {useState} from "react"
import CategorySelector from "@/components/pages/video-categories/category-selector.tsx";
import VideoPlayer from "@/components/pages/video-categories/video-player.tsx";
import {videoCategories} from "@/lib/chapters-data.ts";


export default function Videos() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
