# Caregiver Service Management App

Ứng dụng web mobile mô phỏng quản lý dịch vụ chăm sóc, cho phép người dùng tìm kiếm, đặt dịch vụ từ các người chăm sóc chuyên nghiệp và đánh giá chất lượng dịch vụ.

## 🎯 Tính năng Chính

### Cho Người dùng
- ✅ **Đăng ký & Đăng nhập** - Sử dụng Manus OAuth
- ✅ **Xem Danh sách Caregiver** - Duyệt thông tin người chăm sóc
- ✅ **Đặt Dịch vụ** - Chọn ngày, giờ, tính giá tự động
- ✅ **Đánh giá Dịch vụ** - Để lại đánh giá 1-5 sao
- ✅ **Quản lý Đơn đặt** - Xem lịch sử và trạng thái

### Cho Admin
- ✅ **Quản lý Caregiver** - Thêm, sửa, xóa người chăm sóc
- ✅ **Xem Báo cáo** - Thống kê doanh thu, đánh giá

## 🏗️ Kiến trúc Hệ thống

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  - Home, Caregivers, Booking, MyBookings, Admin Pages      │
└────────────────────────┬────────────────────────────────────┘
                         │
                    tRPC API
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  Backend (Node.js/Express)                  │
│  - Authentication, Caregiver, Booking, Rating APIs         │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Database (MySQL)                          │
│  - Users, Caregivers, Bookings, Ratings Tables             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Database Schema

### Users Table
```sql
- id (PK)
- openId (Unique)
- name
- email
- role (user/admin)
- createdAt, updatedAt
```

### Caregivers Table
```sql
- id (PK)
- name, specialization, experience
- phone, email, address
- hourlyRate, bio
- rating, totalReviews
- isAvailable
- createdAt, updatedAt
```

### Bookings Table
```sql
- id (PK)
- userId (FK), caregiverId (FK)
- serviceDate, duration
- totalPrice, status
- notes
- createdAt, updatedAt
```

### Ratings Table
```sql
- id (PK)
- bookingId (FK), userId (FK), caregiverId (FK)
- rating (1-5), comment
- createdAt
```

## 🚀 Quick Start

### Yêu cầu
- Node.js 18+
- MySQL/TiDB
- pnpm hoặc npm

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd caregiver-app

# Cài đặt dependencies
pnpm install

# Cấu hình environment
cp .env.example .env.local
# Chỉnh sửa .env.local với thông tin của bạn

# Thiết lập database
pnpm db:push

# Seed dữ liệu mẫu (tùy chọn)
node seed-db.mjs

# Chạy development server
pnpm dev
```

Truy cập `http://localhost:3000`

## 📁 Cấu trúc Dự án

```
caregiver-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Caregivers.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   └── Admin.tsx
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities
│   │   └── App.tsx
│   └── index.html
├── server/                 # Node.js Backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema
│   ├── schema.ts
│   └── migrations/
├── seed-db.mjs            # Seed data
├── INSTALLATION.md        # Hướng dẫn cài đặt
├── UML_DOCUMENTATION.md   # Tài liệu UML
└── package.json
```

## 🔧 Các Lệnh Hữu ích

```bash
# Development
pnpm dev                  # Chạy dev server

# Database
pnpm db:push             # Push schema changes
pnpm db:studio           # Mở Drizzle Studio

# Build & Deploy
pnpm build               # Build production
pnpm preview             # Preview build

# Code Quality
pnpm lint                # Kiểm tra code
pnpm format              # Format code
```

## 🔐 Security

- **Authentication**: Manus OAuth
- **Authorization**: Role-based (user/admin)
- **Data Validation**: Input validation trên cả client/server
- **Database**: Parameterized queries (Drizzle ORM)
- **HTTPS**: Bắt buộc trong production

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tailwind CSS responsive utilities
- ✅ Tested trên các kích thước màn hình khác nhau

## 🎨 UI Components

Sử dụng shadcn/ui components:
- Button, Card, Input, Textarea
- Dialog, Toaster
- Form validation

## 📚 Tài liệu

- **INSTALLATION.md** - Hướng dẫn cài đặt chi tiết
- **UML_DOCUMENTATION.md** - Tài liệu kiến trúc UML
- **API Documentation** - Trong server/routers.ts

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

## 🚢 Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set DATABASE_URL="your_db_url"
git push heroku main
```

### Vercel
```bash
vercel
```

## 📊 Performance

- **Database Indexing**: Optimized queries
- **Caching**: Frontend caching
- **Code Splitting**: Lazy loading
- **CDN**: Static assets

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Kiểm tra DATABASE_URL
echo $DATABASE_URL

# Test connection
mysql -u user -p -h host -D database
```

### Port Already in Use
```bash
# Tìm process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### OAuth Error
- Kiểm tra VITE_APP_ID
- Kiểm tra OAUTH_SERVER_URL
- Kiểm tra redirect URI

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature

# Create Pull Request
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - Xem file LICENSE

## 👥 Team

- **Developer**: Nguyễn Minh Huy
- **Project**: Caregiver Service Management App
- **Submission**: Đề tài cuối kỳ

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra INSTALLATION.md
2. Xem UML_DOCUMENTATION.md
3. Kiểm tra logs
4. Liên hệ nhóm phát triển

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: Production Ready
