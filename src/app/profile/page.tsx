import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile/profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()

  // Kiểm tra đăng nhập
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Lấy thông tin profile hiện tại
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') { 
    // PGRST116 là lỗi không tìm thấy dòng nào, ta có thể bỏ qua nếu profile chưa được tạo
    console.error('Error fetching profile:', error)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Hồ sơ cá nhân</h1>
      <ProfileForm profile={profile || null} />
    </main>
  )
}
