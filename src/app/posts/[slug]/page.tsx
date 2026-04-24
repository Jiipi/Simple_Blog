import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { CommentForm } from '@/components/posts/comment-form'
import { RealtimeComments } from '@/components/posts/realtime-comments'
import { LikeButton } from '@/components/posts/like-button'

interface PostPageProps {
  params: { slug: string }
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  return {
    title: post?.title || 'Bài viết',
    description: post?.excerpt || '',
  }
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const supabase = await createClient()

  // Kiểm tra user đã đăng nhập chưa 
  const { data: { user } } = await supabase.auth.getUser()

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        display_name,
        avatar_url
      )
    `)
    .eq('slug', params.slug)
    .single()

  if (error || !post) {
    notFound()
  }

  // Nếu bài viết chưa xuất bản, chỉ tác giả mới được xem
  if (post.status !== 'published') {
    if (!user || user.id !== post.author_id) {
      notFound()
    }
  }

  // Lấy comments 
  const { data: comments } = await supabase
    .from('comments')
    .select(`
      *,
      profiles (
        display_name,
        avatar_url
      )
    `)
    .eq('post_id', post.id)
    .order('created_at', { ascending: true })

  // Lấy tổng số likes
  const { count: likeCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post.id)

  // Kiểm tra xem user hiện tại đã like bài này chưa
  let hasLiked = false
  if (user) {
    const { data: userLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', post.id)
      .eq('user_id', user.id)
      .single()
    if (userLike) hasLiked = true
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span>Bởi {post.profiles?.display_name || 'Ẩn danh'}</span>
            <span>•</span>
            <time>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </time>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown>
            {post.content || ''}
          </ReactMarkdown>
        </div>

        {/* Like Button */}
        <div className="mb-12 flex justify-start">
          <LikeButton postId={post.id} initialLiked={hasLiked} initialCount={likeCount || 0} />
        </div>
      </article>

      {/* Comments Section */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Bình luận ({comments?.length || 0})
        </h2>

        {user ? (
          <div className="mb-8">
            <CommentForm postId={post.id} />
          </div>
        ) : (
          <p className="text-gray-500 mb-8">
            <a href="/login" className="text-blue-600 hover:text-blue-500 hover:underline">
              Đăng nhập
            </a>
            {' '}để bình luận.
          </p>
        )}

        <RealtimeComments postId={post.id} initialComments={comments || []} />
      </section>
    </main>
  )
}
