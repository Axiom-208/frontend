import {Category, Video} from "@/lib/chapters-data.ts";

export function categoriesToVideos(categories: Category[]): Video[] {
    return categories.flatMap(category => category.videos);
}