import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function SearchPage(props: { searchParams: { q?: string } }) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || ''
  
  const supabase = await createClient()

  // Tìm kiếm bằng ilike kết hợp nhiều cột
  let posts: any[] = []
  
  if (query) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (
          display_name,
          avatar_url
        )
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      
    if (data) posts = data
    if (error) console.error(error)
  }

  // Hàm highlight từ khóa đơn giản
  const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim() || !text) return <>{text}</>
    
    // Tách chuỗi dựa trên từ khóa (không phân biệt hoa thường)
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-1">{part}</mark>
            : part
        )}
      </>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Kết quả tìm kiếm cho: <span className="text-blue-600">"{query}"</span>
      </h1>

      {!query ? (
        <p className="text-gray-500">Vui lòng nhập từ khóa để tìm kiếm.</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Không tìm thấy bài viết nào phù hợp với "{query}".</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-lg shadow border border-gray-200"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                  <HighlightText text={post.title} highlight={query} />
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-600 mt-2">
                  <HighlightText text={post.excerpt} highlight={query} />
                </p>
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
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
