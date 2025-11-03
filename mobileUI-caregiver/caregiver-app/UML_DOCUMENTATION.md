# Tài liệu Báo cáo UML - Caregiver Service Management App

## 1. Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        System                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                    ┌──────────────┐      │
│  │ User         │                    │ Admin        │      │
│  └──────────────┘                    └──────────────┘      │
│         │                                   │                │
│         ├─ Login/Register                   ├─ Manage       │
│         │                                   │   Caregivers  │
│         ├─ View Caregivers                  │               │
│         │                                   ├─ Add          │
│         ├─ Book Service                     │   Caregiver   │
│         │                                   │               │
│         ├─ Rate Service                     ├─ Edit         │
│         │                                   │   Caregiver   │
│         └─ View My Bookings                 │               │
│                                             ├─ Delete       │
│                                             │   Caregiver   │
│                                             │               │
│                                             └─ View         │
│                                                 Reports      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Use Case Details

#### UC1: User Registration & Login
- **Actor**: User
- **Precondition**: User không có tài khoản
- **Main Flow**:
  1. User nhấp "Đăng nhập"
  2. System chuyển hướng đến OAuth
  3. User xác thực
  4. System tạo tài khoản nếu là lần đầu
  5. User được đăng nhập

#### UC2: View Caregivers
- **Actor**: User (Authenticated)
- **Main Flow**:
  1. User truy cập trang "Danh sách Caregiver"
  2. System lấy danh sách từ database
  3. Hiển thị thông tin: tên, chuyên môn, kinh nghiệm, giá, đánh giá

#### UC3: Book Service
- **Actor**: User (Authenticated)
- **Main Flow**:
  1. User chọn caregiver
  2. User điền ngày, giờ, thời lượng
  3. System tính toán giá
  4. User xác nhận đặt
  5. System lưu booking với status "pending"

#### UC4: Rate Service
- **Actor**: User (Authenticated)
- **Precondition**: Booking đã hoàn thành
- **Main Flow**:
  1. User xem danh sách booking hoàn thành
  2. User chọn "Đánh giá"
  3. User chọn số sao (1-5)
  4. User thêm bình luận
  5. System lưu rating
  6. System cập nhật average rating của caregiver

#### UC5: Manage Caregivers (Admin)
- **Actor**: Admin
- **Main Flow**:
  1. Admin truy cập trang "Quản lý"
  2. Admin có thể:
     - Thêm caregiver mới
     - Sửa thông tin caregiver
     - Xóa caregiver
     - Xem danh sách

---

## 2. Class Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           User                                       │
├─────────────────────────────────────────────────────────────────────┤
│ - id: int (PK)                                                      │
│ - openId: string (Unique)                                           │
│ - name: string                                                      │
│ - email: string                                                     │
│ - role: enum (user, admin)                                          │
│ - createdAt: timestamp                                              │
│ - updatedAt: timestamp                                              │
│ - lastSignedIn: timestamp                                           │
├─────────────────────────────────────────────────────────────────────┤
│ + login(): void                                                     │
│ + logout(): void                                                    │
│ + updateProfile(): void                                             │
└─────────────────────────────────────────────────────────────────────┘
                              △
                              │ 1
                              │
                    ┌─────────┴──────────┐
                    │                    │
                    │ 1                  │ *
                    ▼                    ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│      Caregiver               │  │      Booking                 │
├──────────────────────────────┤  ├──────────────────────────────┤
│ - id: int (PK)               │  │ - id: int (PK)               │
│ - name: string               │  │ - userId: int (FK)           │
│ - specialization: string     │  │ - caregiverId: int (FK)      │
│ - experience: int            │  │ - serviceDate: timestamp     │
│ - phone: string              │  │ - duration: int              │
│ - email: string              │  │ - totalPrice: int            │
│ - address: string            │  │ - status: enum               │
│ - hourlyRate: int            │  │ - notes: string              │
│ - bio: text                  │  │ - createdAt: timestamp       │
│ - rating: int                │  │ - updatedAt: timestamp       │
│ - totalReviews: int          │  ├──────────────────────────────┤
│ - isAvailable: boolean       │  │ + create(): void             │
│ - createdAt: timestamp       │  │ + update(): void             │
│ - updatedAt: timestamp       │  │ + cancel(): void             │
├──────────────────────────────┤  └──────────────────────────────┘
│ + getInfo(): object          │           △
│ + updateRating(): void       │           │ 1
│ + getReviews(): array        │           │
└──────────────────────────────┘           │ *
                                           │
                                    ┌──────┴──────────┐
                                    │                 │
                                    ▼                 ▼
                            ┌──────────────────────────────┐
                            │      Rating                  │
                            ├──────────────────────────────┤
                            │ - id: int (PK)               │
                            │ - bookingId: int (FK)        │
                            │ - userId: int (FK)           │
                            │ - caregiverId: int (FK)      │
                            │ - rating: int (1-5)          │
                            │ - comment: text              │
                            │ - createdAt: timestamp       │
                            ├──────────────────────────────┤
                            │ + create(): void             │
                            │ + getAverage(): float        │
                            └──────────────────────────────┘
```

### Class Relationships

| Relationship | Description |
|---|---|
| User → Booking (1:*) | Một user có nhiều booking |
| Caregiver → Booking (1:*) | Một caregiver có nhiều booking |
| Booking → Rating (1:1) | Một booking có một rating |
| User → Rating (1:*) | Một user có nhiều rating |
| Caregiver → Rating (1:*) | Một caregiver có nhiều rating |

---

## 3. Sequence Diagram

### 3.1 User Registration Flow

```
User          Browser          Server          Database
  │              │                │                │
  ├─ Click Login─>│                │                │
  │              ├─ Redirect OAuth─>│                │
  │              │                │                │
  ├─ Authenticate│                │                │
  │              ├─ OAuth Callback─>│                │
  │              │                ├─ Check User───>│
  │              │                │                │
  │              │                ├─ Create User──>│
  │              │                │                │
  │              │<─ Set Cookie────┤                │
  │              │                │                │
  │<─ Redirect──┤                │                │
  │              │                │                │
```

### 3.2 Book Service Flow

```
User          Browser          Server          Database
  │              │                │                │
  ├─ Select Date─>│                │                │
  │              │                │                │
  ├─ Confirm────>│                │                │
  │              ├─ Create Booking─>│                │
  │              │                ├─ Save Booking─>│
  │              │                │                │
  │              │<─ Success────────┤                │
  │              │                │                │
  │<─ Redirect──┤                │                │
  │              │                │                │
```

### 3.3 Rate Service Flow

```
User          Browser          Server          Database
  │              │                │                │
  ├─ Select Star─>│                │                │
  │              │                │                │
  ├─ Add Comment─>│                │                │
  │              │                │                │
  ├─ Submit────>│                │                │
  │              ├─ Create Rating──>│                │
  │              │                ├─ Save Rating──>│
  │              │                │                │
  │              │                ├─ Update Caregiver─>│
  │              │                │  (avg rating)     │
  │              │<─ Success────────┤                │
  │              │                │                │
  │<─ Redirect──┤                │                │
  │              │                │                │
```

### 3.4 Admin Manage Caregiver Flow

```
Admin         Browser          Server          Database
  │              │                │                │
  ├─ Click Add───>│                │                │
  │              │                │                │
  ├─ Fill Form───>│                │                │
  │              │                │                │
  ├─ Submit────>│                │                │
  │              ├─ Create Caregiver─>│              │
  │              │                ├─ Save────────>│
  │              │                │                │
  │              │<─ Success────────┤                │
  │              │                │                │
  │<─ Redirect──┤                │                │
  │              │                │                │
```

---

## 4. Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────────────┐           ┌──────────────┐               │
│  │    users     │           │  caregivers  │               │
│  ├──────────────┤           ├──────────────┤               │
│  │ id (PK)      │           │ id (PK)      │               │
│  │ openId (U)   │           │ name         │               │
│  │ name         │           │ specialization
│  │ email        │           │ experience   │               │
│  │ role         │           │ phone        │               │
│  │ createdAt    │           │ email        │               │
│  │ updatedAt    │           │ address      │               │
│  │ lastSignedIn │           │ hourlyRate   │               │
│  └──────────────┘           │ bio          │               │
│         △                    │ rating       │               │
│         │ 1                  │ totalReviews │               │
│         │                    │ isAvailable  │               │
│         │ *                  │ createdAt    │               │
│         │                    │ updatedAt    │               │
│         │                    └──────────────┘               │
│         │                           △                       │
│         │                           │ 1                     │
│         │                           │                       │
│         │                           │ *                     │
│  ┌──────┴──────────┐                │                       │
│  │                 │                │                       │
│  ▼                 ▼                ▼                       │
│ ┌──────────────┐  ┌──────────────┐                         │
│ │   bookings   │  │   ratings    │                         │
│ ├──────────────┤  ├──────────────┤                         │
│ │ id (PK)      │  │ id (PK)      │                         │
│ │ userId (FK)  │  │ bookingId(FK)│                         │
│ │ caregiverId(FK)
│ │ serviceDate  │  │ userId (FK)  │                         │
│ │ duration     │  │ caregiverId(FK)
│ │ totalPrice   │  │ rating       │                         │
│ │ status       │  │ comment      │                         │
│ │ notes        │  │ createdAt    │                         │
│ │ createdAt    │  └──────────────┘                         │
│ │ updatedAt    │                                           │
│ └──────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Data Flow Diagram (DFD)

### Level 0 - Context Diagram

```
        ┌─────────────────┐
        │   User/Admin    │
        └────────┬────────┘
                 │
                 │ (1) Login/Register
                 │ (2) Browse Caregivers
                 │ (3) Book Service
                 │ (4) Rate Service
                 │ (5) Manage Caregivers
                 ▼
        ┌─────────────────────────────────┐
        │  Caregiver Service App          │
        │  - Authentication               │
        │  - Caregiver Management         │
        │  - Booking Management           │
        │  - Rating System                │
        └─────────────────────────────────┘
                 │
                 │ (1) User Data
                 │ (2) Caregiver Data
                 │ (3) Booking Data
                 │ (4) Rating Data
                 ▼
        ┌─────────────────┐
        │   Database      │
        └─────────────────┘
```

### Level 1 - Main Processes

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────────────────┐      ┌──────────────────┐            │
│  │ 1.0              │      │ 2.0              │            │
│  │ Authentication   │      │ Caregiver        │            │
│  │ - Register       │      │ Management       │            │
│  │ - Login          │      │ - Add            │            │
│  │ - Logout         │      │ - Edit           │            │
│  └──────────────────┘      │ - Delete         │            │
│                            │ - View           │            │
│  ┌──────────────────┐      └──────────────────┘            │
│  │ 3.0              │      ┌──────────────────┐            │
│  │ Booking          │      │ 4.0              │            │
│  │ Management       │      │ Rating System    │            │
│  │ - Create         │      │ - Submit Rating  │            │
│  │ - View           │      │ - Calculate Avg  │            │
│  │ - Update         │      │ - View Reviews   │            │
│  │ - Cancel         │      └──────────────────┘            │
│  └──────────────────┘                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. State Diagram - Booking Status

```
                    ┌─────────────┐
                    │   Created   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Pending   │
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
        ┌─────────────┐       ┌─────────────┐
        │ Confirmed   │       │  Cancelled  │
        └──────┬──────┘       └─────────────┘
               │
               ▼
        ┌─────────────┐
        │  Completed  │
        └─────────────┘
```

---

## 7. Activity Diagram - Book Service Process

```
                    ┌─────────────┐
                    │   Start     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Select Date │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Select Time │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Enter Notes │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Calculate   │
                    │ Total Price │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Review Info │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
            ┌─────────────┐  ┌─────────────┐
            │  Confirm    │  │   Cancel    │
            └──────┬──────┘  └──────┬──────┘
                   │                │
                   ▼                ▼
            ┌─────────────┐  ┌─────────────┐
            │ Save to DB  │  │   End       │
            └──────┬──────┘  └─────────────┘
                   │
                   ▼
            ┌─────────────┐
            │ Show Success│
            └──────┬──────┘
                   │
                   ▼
            ┌─────────────┐
            │   End       │
            └─────────────┘
```

---

## 8. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Node.js, Express, tRPC |
| **Database** | MySQL/TiDB, Drizzle ORM |
| **Authentication** | Manus OAuth |
| **Deployment** | Docker, Cloud Platform |

---

## 9. API Endpoints

### Authentication
- `POST /api/oauth/callback` - OAuth callback
- `GET /api/trpc/auth.me` - Get current user
- `POST /api/trpc/auth.logout` - Logout

### Caregiver
- `GET /api/trpc/caregiver.list` - List all caregivers
- `GET /api/trpc/caregiver.getById` - Get caregiver by ID
- `POST /api/trpc/caregiver.create` - Create caregiver (Admin)
- `POST /api/trpc/caregiver.update` - Update caregiver (Admin)
- `POST /api/trpc/caregiver.delete` - Delete caregiver (Admin)

### Booking
- `POST /api/trpc/booking.create` - Create booking
- `GET /api/trpc/booking.getUserBookings` - Get user bookings
- `GET /api/trpc/booking.getById` - Get booking by ID
- `POST /api/trpc/booking.update` - Update booking

### Rating
- `POST /api/trpc/rating.create` - Create rating
- `GET /api/trpc/rating.getCaregiverRatings` - Get caregiver ratings
- `GET /api/trpc/rating.getBookingRating` - Get booking rating

---

## 10. Security Considerations

1. **Authentication**: Sử dụng Manus OAuth, không lưu mật khẩu
2. **Authorization**: Kiểm tra role (user/admin) trên server
3. **Data Validation**: Validate input trên cả client và server
4. **SQL Injection**: Sử dụng Drizzle ORM, parameterized queries
5. **CORS**: Cấu hình CORS cho frontend domain
6. **HTTPS**: Sử dụng HTTPS trong production
7. **Rate Limiting**: Giới hạn số request từ một IP

---

## 11. Performance Optimization

1. **Database Indexing**: Index trên `userId`, `caregiverId`, `status`
2. **Caching**: Cache danh sách caregiver
3. **Pagination**: Phân trang danh sách booking
4. **Lazy Loading**: Load ảnh caregiver khi cần
5. **Code Splitting**: Chia nhỏ bundle React
6. **CDN**: Sử dụng CDN cho static assets

---

## 12. Testing Strategy

| Test Type | Coverage |
|---|---|
| Unit Tests | Utility functions, helpers |
| Integration Tests | API endpoints, database |
| E2E Tests | User workflows |
| Performance Tests | Load testing |

---

Tài liệu này cung cấp cái nhìn toàn diện về kiến trúc và thiết kế của Caregiver Service Management App.
