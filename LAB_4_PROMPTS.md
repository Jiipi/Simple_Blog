# TÀI LIỆU TỔNG HỢP PROMPT BÀI THỰC HÀNH 4

**Môn học:** Các công nghệ mới trong phát triển phần mềm  
**Bài thực hành 4:** Supabase Backend-as-a-Service & Authentication  
**Sinh viên:** Trần Ngọc Hưng - **MSSV:** 2212377

Dưới đây là danh sách đầy đủ tất cả các câu Prompt (lệnh yêu cầu AI) mô phỏng lại toàn bộ quá trình thực hiện Lab 4 từ đầu đến cuối (Từ phần 1 đến phần 7). Tài liệu này bám sát 100% nội dung file hướng dẫn thực hành.

---

## Phần 1: Giới thiệu Supabase & Khởi tạo Project
**Prompt 1:**  
> "Hãy giúp tôi thiết lập dự án Next.js 15 kết nối với Supabase. 
> 1. Tạo project Next.js với TypeScript, Tailwind CSS, App Router. 
> 2. Cài đặt `@supabase/supabase-js` và `@supabase/ssr`. 
> 3. Tạo file `.env.local` chứa các biến môi trường `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
> 4. Tạo các file utility cho Supabase client ở: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, và `src/lib/supabase/middleware.ts`. Cuối cùng, cập nhật file `src/middleware.ts` và `src/app/page.tsx` để test kết nối."

---

## Phần 2: Database Design & Schema
**Prompt 2:**  
> "Dựa trên ERD của dự án Blog, hãy viết cho tôi các câu lệnh SQL để chạy trên Supabase:
> 1. Tạo bảng `profiles` (id, display_name, avatar_url, created_at, updated_at). Viết Trigger tự động tạo profile khi có user mới đăng ký.
> 2. Tạo bảng `posts` (id, author_id, title, slug, content, excerpt, status, created_at, updated_at, published_at). Viết Function và Trigger tự động generate `slug` từ `title`.
> 3. Tạo bảng `comments` (id, post_id, author_id, content, created_at).
> 4. Viết Function và Trigger để tự động cập nhật trường `updated_at` mỗi khi có thay đổi dữ liệu."

---

## Phần 3: Row Level Security (RLS)
**Prompt 3:**  
> "Bây giờ hãy viết các RLS Policies để bảo mật cơ sở dữ liệu:
> 1. Bật RLS cho cả 3 bảng `profiles`, `posts`, `comments`.
> 2. Bảng `profiles`: Ai cũng xem được, nhưng user chỉ được update profile của chính mình.
> 3. Bảng `posts`: Ai cũng xem được bài `published`. Author có quyền xem draft, tạo mới, cập nhật và xóa bài của chính mình.
> 4. Bảng `comments`: Ai cũng xem được bình luận của bài viết đã `published`. User đã đăng nhập được tạo bình luận. Tác giả được xóa bình luận của mình."

---

## Phần 4: Authentication
**Prompt 4:**  
> "Tiếp theo, hãy implement hệ thống Authentication cho ứng dụng:
> 1. Tạo trang đăng ký (`/register`) và đăng nhập (`/login`) dùng Email/Password.
> 2. Thêm nút đăng nhập bằng OAuth GitHub, tạo route handler xử lý callback ở `/auth/callback/route.ts`.
> 3. Xây dựng chức năng Đăng xuất bằng Server Actions (`src/app/actions/auth.ts`).
> 4. Cập nhật Middleware để bảo vệ trang `/dashboard` (chưa đăng nhập thì chuyển hướng về `/login`).
> 5. Tạo component `Header` (`src/components/layout/header.tsx`) thay đổi trạng thái UI dựa vào việc user đã đăng nhập hay chưa."

---

## Phần 5: CRUD Operations — Blog Posts
**Prompt 5:**  
> "Hãy implement các thao tác CRUD cho bài viết:
> 1. Định nghĩa các TypeScript Types trong `src/types/database.ts` (Profile, Post, Comment).
> 2. Tạo trang Dashboard (`/dashboard`) hiển thị danh sách tất cả bài viết (cả draft và published) của user hiện tại.
> 3. Tạo form dùng chung (`post-form.tsx`) để Viết bài mới (`/dashboard/new`) và Chỉnh sửa bài viết (`/dashboard/edit/[id]`).
> 4. Thêm nút Xóa bài viết có hộp thoại xác nhận.
> 5. Cập nhật trang chủ (`/`) để hiển thị danh sách các bài viết đã `published`. Thêm tính năng phân trang (Pagination) cho trang chủ (Bài tập 5.1).
> 6. Tạo trang chi tiết bài viết `/posts/[slug]` và sử dụng `react-markdown` + `@tailwindcss/typography` để hiển thị nội dung."

---

## Phần 6: Comments & Realtime (Bonus)
**Prompt 6:**  
> "Thêm tính năng bình luận cho bài viết:
> 1. Tạo component form bình luận (`comment-form.tsx`).
> 2. Tạo component danh sách bình luận (`comment-list.tsx`).
> 3. Tích hợp form và danh sách vào trang chi tiết bài viết (`/posts/[slug]`).
> 4. Nâng cấp component danh sách bình luận bằng cách sử dụng Supabase Realtime Channels (`realtime-comments.tsx`) để tự động hiển thị bình luận mới mà không cần F5."

---

## Phần 7: Thực hiện Bài tập tự làm (7.1 đến 7.4)

**Prompt 7 (Bài tập 7.1):**  
> "Thực hiện Bài tập 7.1: Thêm trang Profile. Tạo trang `/profile` cho phép user xem và chỉnh sửa profile của mình. Cho phép cập nhật `display_name` và `avatar_url`."

**Prompt 8 (Bài tập 7.2):**  
> "Thực hiện Bài tập 7.2: Thêm tính năng Like. Tạo bảng `likes` với schema `post_id`, `user_id`. Thêm RLS policies phù hợp. Hiển thị số lượng likes và nút like/unlike trên bài viết có tự động cập nhật."

**Prompt 9 (Bài tập 7.3):**  
> "Thực hiện Bài tập 7.3: Upload hình ảnh. Sử dụng Supabase Storage để upload ảnh cho bài viết. Tạo bucket, cấu hình RLS policies cho bucket. Cho phép chèn link ảnh lấy được vào form nội dung bài viết."

**Prompt 10 (Bài tập 7.4):**  
> "Thực hiện Bài tập 7.4: Tìm kiếm bài viết. Implement tính năng tìm kiếm full-text với PostgreSQL. Tạo trang `/search?q=keyword` chứa kết quả tìm kiếm và làm nổi bật (highlight) từ khóa được tìm thấy."

---

## Phần 8: Quản lý Git & GitHub
**Prompt 11:**  
> "Dự án đã hoàn thành, hãy:
> 1. Viết lại file `README.md` theo chuẩn mô tả bài Lab 4 (có điền tên, MSSV, giáo viên hướng dẫn, tóm tắt tính năng).
> 2. Push toàn bộ code lên repository: `https://github.com/Jiipi/Simple_Blog.git`.
> 3. Hãy sửa lại các Commit Message theo đúng chuẩn kỹ thuật phần mềm (Conventional Commits) và khôi phục đúng mốc thời gian."
