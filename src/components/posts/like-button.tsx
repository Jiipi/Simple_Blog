'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface LikeButtonProps {
  postId: string
  initialLiked: boolean
  initialCount: number
}

export function LikeButton({ postId, initialLiked, initialCount }: LikeButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const toggleLike = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('Vui lòng đăng nhập để thích bài viết!')
        router.push('/login')
        return
      }

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ post_id: postId, user_id: user.id })
        
        if (error) throw error
        setIsLiked(false)
        setCount(prev => Math.max(0, prev - 1))
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ post_id: postId, user_id: user.id })
          
        if (error) throw error
        setIsLiked(true)
        setCount(prev => prev + 1)
      }
    } catch (err: any) {
      console.error(err)
      alert('Có lỗi xảy ra: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
        isLiked 
          ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' 
          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
      } disabled:opacity-50`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill={isLiked ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={isLiked ? 0 : 2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="font-medium">{count} Thích</span>
    </button>
  )
}
