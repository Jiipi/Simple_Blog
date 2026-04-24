# BÀI THỰC HÀNH 4: SUPABASE BACKEND-AS-A-SERVICE & AUTHENTICATION

**Môn học:** Các công nghệ mới trong phát triển phần mềm  
**Buổi:** 4/8 | **Thời lượng:** 4 tiết (180 phút)  
**Giảng viên:** Nguyễn Trọng Hiếu  
**Sinh viên:** Trần Ngọc Hưng - **MSSV:** 2212377  
**Link Repository:** [https://github.com/Jiipi/Simple_Blog](https://github.com/Jiipi/Simple_Blog)

---

## 📖 Giới thiệu dự án (Simple Blog)

**Simple Blog** là một ứng dụng nền tảng web viết blog đầy đủ tính năng (Full-stack) được xây dựng bằng kiến trúc hiện đại, sử dụng **Next.js 15 (App Router)** cho Frontend & Server-side rendering, kết hợp sức mạnh của **Supabase** (Backend-as-a-Service) để quản lý cơ sở dữ liệu, xác thực người dùng và lưu trữ tệp.

Dự án này là kết quả của việc hoàn thiện toàn bộ Lab 4, bao gồm cả các bài tập cơ bản và nâng cao.

## ✨ Các tính năng nổi bật đã triển khai

### 1. Authentication (Xác thực người dùng)
- Đăng ký và Đăng nhập an toàn với Email/Mật khẩu.
- Đăng nhập bằng tài khoản mạng xã hội (**OAuth GitHub**).
- Quản lý phiên đăng nhập (Session Management) qua Next.js Middleware.
- Bảo vệ các trang riêng tư (Dashboard, Profile) yêu cầu đăng nhập.

### 2. Quản lý Cơ sở dữ liệu (PostgreSQL)
- Schema chặt chẽ gồm các bảng: `auth.users`, `profiles`, `posts`, `comments`, và `likes`.
- Áp dụng các **Database Triggers & Functions** tự động: tạo profile khi đăng ký, tự động tạo chuỗi `slug` tĩnh từ tiêu đề bài viết, tự động cập nhật thời gian.

### 3. Row Level Security (RLS)
- Bảo mật cấp độ dòng dữ liệu (RLS) chặt chẽ bằng các Policies của Supabase.
- Chỉ người dùng được xác thực mới có quyền thêm/sửa/xóa dữ liệu.
- Tác giả chỉ có thể thay đổi, chỉnh sửa bài viết, ảnh, và bình luận thuộc quyền sở hữu của họ.

### 4. CRUD Bài viết (Blog Posts)
- Tạo, đọc, cập nhật, và xóa (CRUD) bài viết thông qua trang Dashboard cá nhân.
- Hỗ trợ lưu trữ bài viết dưới dạng **Bản nháp (Draft)** hoặc **Xuất bản (Published)**.
- Viết bài hỗ trợ định dạng chuẩn Markdown (sử dụng thư viện `react-markdown` và `@tailwindcss/typography`).
- Tính năng phân trang (Pagination) bài viết gọn gàng ở trang chủ.

### 5. Tính năng Tương tác (Comments & Likes)
- Hệ thống **Bình luận theo thời gian thực (Realtime Comments)** sử dụng Supabase Realtime Channels.
- Cho phép người đọc thả tim (Like/Unlike) bài viết tương tự mạng xã hội.

### 6. Quản lý Hồ sơ & Tệp tin (Advanced Features)
- **Cập nhật Profile:** Tùy biến thông tin cá nhân (Tên hiển thị, Ảnh đại diện).
- **Supabase Storage:** Upload hình ảnh đính kèm bài viết, lấy link chia sẻ công khai và tự động nhúng vào nội dung Markdown.
- **Tìm kiếm thông minh (Full-text Search):** Tìm kiếm bài viết bằng từ khóa, hỗ trợ quét trên toàn bộ các cột tiêu đề, tóm tắt và nội dung, đi kèm tính năng Highlight từ khóa kết quả.

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu hệ thống
- Node.js 18.x trở lên
- Git
- Một dự án đã khởi tạo trên [Supabase](https://supabase.com/)

### 2. Cài đặt

Clone repository về máy:
```bash
git clone https://github.com/Jiipi/Simple_Blog.git
cd simple-blog
