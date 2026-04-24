import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const POSTS_PER_PAGE = 5

interface HomePageProps {
  searchParams: { page?: string }
}

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams.page) || 1
  
  const supabase = await createClient()

  const from = (currentPage - 1) * POSTS_PER_PAGE
  const to = from + POSTS_PER_PAGE - 1

  // Lấy bài viết đã publish, kèm thông tin author và tổng số lượng
  const { data: posts, error, count } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        display_name,
        avatar_url
      )
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bài viết mới nhất</h1>

      {posts && posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <span>
                    Bởi {post.profiles?.display_name || 'Ẩn danh'}
                  </span>
                  <span>•</span>
                  <span>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('vi-VN')
                      : 'Chưa xuất bản'}
                  </span>
                </div>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-500"
                >
                  Đọc tiếp →
                </Link>
              </article>
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              {currentPage > 1 ? (
                <Link
                  href={`/?page=${currentPage - 1}`}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Trang trước
                </Link>
              ) : (
                <span className="px-4 py-2 border border-gray-200 rounded text-gray-400 bg-gray-50 cursor-not-allowed">
                  Trang trước
                </span>
              )}
              
              <span className="text-sm text-gray-600 font-medium">
                Trang {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/?page=${currentPage + 1}`}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Trang sau
                </Link>
              ) : (
                <span className="px-4 py-2 border border-gray-200 rounded text-gray-400 bg-gray-50 cursor-not-allowed">
                  Trang sau
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Chưa có bài viết nào.</p>
        </div>
      )}
    </main>
  )
}
