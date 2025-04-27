import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {ChevronLeft} from "lucide-react"
import VideoCard from "@/components/pages/video-categories/video-card.tsx";

interface Video {
    id: number
    url: string
    title: string
    description: string
    topic: string
}

interface VideoPlayerProps {
    videos: Video[]
    categoryTitle: string
    onBack: () => void
}

export default function VideoPlayer({videos, categoryTitle, onBack}: VideoPlayerProps) {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const videoIndex = Number.parseInt(entry.target.getAttribute("data-index") || "0")
                        setActiveVideoIndex(videoIndex)
                    }
                })
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.8, // Video is considered visible when 80% is in view
            },
        )

        // Observe all video elements
        const videoElements = containerRef.current.querySelectorAll(".video-container")
        videoElements.forEach((el) => observer.observe(el))

        return () => {
            videoElements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    return (
        <div className="relative h-screen w-full bg-black overflow-hidden">
            {/* Back button and category title */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/40 hover:bg-black/60 text-white"
                        onClick={onBack}
                    >
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <h2 className="text-white text-lg font-medium">{categoryTitle}</h2>
                </div>
            </div>

            {/* Video container */}
            <div
                ref={containerRef}
                className="h-full overflow-y-scroll snap-y snap-mandatory"
                style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
            >
                {videos.map((video, index) => (
                    <div key={video.id} data-index={index}
                         className="video-container h-screen w-full snap-start snap-always">
                        <VideoCard video={video} isActive={activeVideoIndex === index} totalVideos={videos.length}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
