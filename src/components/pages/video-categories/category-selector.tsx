import {Button} from "@/components/ui/button"
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

interface Category {
    id: string
    title: string
    description: string
    thumbnail: string
    videos: Video[]
}

interface Video {
    id: number;
    url: string;
    title: string;
    topic: string;
    description: string;
}

interface CategorySelectorProps {
    categories: Category[]
    onSelectCategory: (categoryId: string) => void
}

export default function CategorySelector({categories, onSelectCategory}: CategorySelectorProps) {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-2">Your Videos</h1>
            <p className="text-gray-700 mb-8">Select a category to start learning</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="overflow-hidden bg-zinc-100 border-zinc-200 hover:border-zinc-300 transition-all ease-in-out duration-300"
                    >
                        <div className="relative h-48 w-full">
                            <img
                                src={category.thumbnail || "/placeholder.svg"}
                                alt={category.title}
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                            <div className="absolute bottom-4 left-4 bg-zinc-50/80 px-3 py-1 rounded-full">
                                <p className=" text-sm">{category.videos.length} videos</p>
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="">{category.title}</CardTitle>
                            <CardDescription className="text-gray-700">{category.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full" onClick={() => onSelectCategory(category.id)}>
                                Watch Videos
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
