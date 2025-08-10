"use client"

import { Post } from "@/lib/posts"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Share2 } from "lucide-react"



const ShareButton = ({ post }: { post: Post }) => {

  const handleShare = async () => {
    const url = `${window.location.origin}/thoughts/${post.slug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: url,
        })
      } catch (error) {
        // User cancelled sharing
        console.log('Share cancelled', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      } catch (error) {
        console.log('Copy to clipboard failed', error)
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        toast.success('Link copied to clipboard!')
      }
    }
  }


  return <Button
    variant="ghost"
    size="sm"
    className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
    onClick={handleShare}
  >
    <Share2 className="w-4 h-4 mr-2" />
    Share
  </Button>
}

export default ShareButton