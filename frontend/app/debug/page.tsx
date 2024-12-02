"use client"

import { useLatestToken } from "@/hooks/contract/useLatestToken"
import { useImageUrl } from "@/hooks/contract/read/useImageUrl"

export default function Debug() {
    const { latestToken, isError: isLatestTokenError, isLoading: isLatestTokenLoading } = useLatestToken()
    const { imageUrl, isError: isImageUrlError, isLoading: isImageUrlLoading } = useImageUrl(latestToken as `0x${string}`)

    if (isLatestTokenLoading || isImageUrlLoading) return <div>Loading...</div>
    if (isLatestTokenError) return <div>Error fetching latest token</div>
    if (isImageUrlError) return <div>Error fetching image URL</div>

    return (
        <div>
            <div>Latest Token Address: {latestToken}</div>
            <div>Image URL: {imageUrl}</div>
        </div>
    )
}