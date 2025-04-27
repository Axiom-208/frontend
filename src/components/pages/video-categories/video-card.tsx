import {useEffect, useRef} from "react"

interface VideoCardProps {
    video: {
        id: number
        url: string
        title: string
        description: string
        topic: string
    }
    isActive: boolean
    totalVideos: number
}

export default function VideoCard({video, isActive, totalVideos}: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!videoRef.current) return

        if (isActive) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch((err) => console.error("Error playing video:", err))
        } else {
            videoRef.current.pause()
        }
    }, [isActive])

    return (
        <div className="relative h-full w-full">
            <video
                ref={videoRef}
                src={video.url}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"/>

            {/* Topic badge */}
            <div className="absolute top-20 right-8 z-10">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {video.topic}
        </span>
            </div>

            {/* Lesson number indicator */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white text-xl font-bold">{video.id}</span>
                    <div className="h-16 w-0.5 bg-white/30"></div>
                    <span className="text-white text-xl font-bold">{totalVideos}</span>
                </div>
            </div>

            {/* Content information */}
            <div className="absolute bottom-24 left-8 right-8 z-10">
                <h2 className="text-white text-2xl font-bold mb-3">{video.title}</h2>
                <p className="text-white text-base">{video.description}</p>
            </div>

            {/* Progress bar */}
            {isActive && (
                <div className="absolute bottom-16 left-0 right-0 h-1 bg-gray-700 z-10">
                    <div className="h-full bg-white w-0 animate-progress"></div>
                </div>
            )}
        </div>
    )
}
