# Hướng dẫn Cài đặt và Chạy Caregiver Service Management App

## Yêu cầu hệ thống

- **Node.js**: Phiên bản 18.0 trở lên
- **npm hoặc pnpm**: Trình quản lý package
- **MySQL/TiDB**: Cơ sở dữ liệu (hoặc sử dụng dịch vụ cloud)
- **Git**: Để clone repository

## Bước 1: Clone Repository

```bash
git clone <repository-url>
cd caregiver-app
```

## Bước 2: Cài đặt Dependencies

Sử dụng pnpm (được khuyến nghị):

```bash
pnpm install
```

Hoặc sử dụng npm:

```bash
npm install
```

## Bước 3: Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc dự án:

```bash
cp .env.example .env.local
```

Cập nhật các biến môi trường sau:

```
# Database
DATABASE_URL="mysql://user:password@localhost:3306/caregiver_db"

# OAuth (Manus)
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
JWT_SECRET=your_jwt_secret

# App Configuration
VITE_APP_TITLE="Caregiver Service Management App"
VITE_APP_LOGO="https://your-logo-url.png"

# Owner Info
OWNER_NAME="Your Name"
OWNER_OPEN_ID="your_open_id"
```

## Bước 4: Thiết lập Database

### 4.1 Tạo cơ sở dữ liệu

```bash
mysql -u root -p
```

```sql
CREATE DATABASE caregiver_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4.2 Chạy migration

```bash
pnpm db:push
```

Lệnh này sẽ:
- Tạo các bảng: `users`, `caregivers`, `bookings`, `ratings`
- Thiết lập các foreign keys
- Cấu hình các cột mặc định

### 4.3 Seed dữ liệu mẫu (tùy chọn)

```bash
node seed-db.mjs
```

Điều này sẽ thêm 5 caregiver mẫu vào database để bạn có thể demo ứng dụng.

## Bước 5: Chạy Development Server

```bash
pnpm dev
```

Server sẽ khởi động tại `http://localhost:3000`

## Bước 6: Truy cập Ứng dụng

Mở trình duyệt và truy cập:

```
http://localhost:3000
```

## Cấu trúc Dự án

```
caregiver-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Các trang chính
│   │   │   ├── Home.tsx
│   │   │   ├── Caregivers.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   └── Admin.tsx
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app component
│   └── index.html
├── server/                 # Node.js Backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema
│   ├── schema.ts          # Table definitions
│   └── migrations/        # Migration files
├── seed-db.mjs            # Seed data script
└── package.json           # Dependencies
```

## Các Tính năng Chính

### 1. Đăng ký & Đăng nhập
- Sử dụng Manus OAuth
- Tự động tạo tài khoản người dùng
- Quản lý phiên làm việc

### 2. Xem Danh sách Caregiver
- Hiển thị thông tin caregiver
- Lọc theo chuyên môn
- Xem đánh giá và kinh nghiệm

### 3. Đặt Dịch vụ
- Chọn caregiver
- Chọn ngày và thời gian
- Tính toán giá tự động
- Thêm ghi chú

### 4. Đánh giá Dịch vụ
- Đánh giá từ 1-5 sao
- Thêm bình luận
- Cập nhật rating caregiver

### 5. Quản lý Caregiver (Admin)
- Thêm caregiver mới
- Sửa thông tin caregiver
- Xóa caregiver
- Quản lý tính sẵn có

## Các Lệnh Hữu ích

```bash
# Development
pnpm dev                  # Chạy dev server

# Database
pnpm db:push             # Push schema changes
pnpm db:studio           # Mở Drizzle Studio

# Build
pnpm build               # Build production

# Lint & Format
pnpm lint                # Kiểm tra code
pnpm format              # Format code
```

## Troubleshooting

### Lỗi kết nối database

**Vấn đề**: `Error: connect ECONNREFUSED`

**Giải pháp**:
1. Kiểm tra MySQL đang chạy
2. Kiểm tra `DATABASE_URL` trong `.env.local`
3. Kiểm tra tên người dùng và mật khẩu

### Lỗi OAuth

**Vấn đề**: `Invalid OAuth credentials`

**Giải pháp**:
1. Kiểm tra `VITE_APP_ID` và `OAUTH_SERVER_URL`
2. Đảm bảo app được đăng ký trên Manus
3. Kiểm tra redirect URI

### Lỗi port đã được sử dụng

**Vấn đề**: `Port 3000 is already in use`

**Giải pháp**:
```bash
# Tìm process sử dụng port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Hoặc sử dụng port khác
PORT=3001 pnpm dev
```

## Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL="your_db_url"
heroku config:set VITE_APP_ID="your_app_id"

# Deploy
git push heroku main
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra tệp log
2. Xem lại hướng dẫn này
3. Liên hệ với nhóm phát triển

## License

MIT License - Xem file LICENSE để biết thêm chi tiết
