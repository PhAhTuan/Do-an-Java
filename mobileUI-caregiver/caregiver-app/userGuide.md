# Hướng dẫn Sử dụng Caregiver Service Management App

## Giới thiệu

**Caregiver Service Management App** là ứng dụng web mobile cho phép bạn tìm kiếm, đặt dịch vụ chăm sóc từ những người chuyên nghiệp và đánh giá chất lượng dịch vụ.

**Mục đích**: Kết nối những người cần dịch vụ chăm sóc với những người chăm sóc tận tâm, chuyên nghiệp.

**Truy cập**: Mở trình duyệt và vào `http://localhost:3000`

## Powered by Manus

**Tech Stack**:
- **Frontend**: React 19 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + tRPC
- **Database**: MySQL + Drizzle ORM
- **Authentication**: Manus OAuth
- **Deployment**: Auto-scaling infrastructure with global CDN

Ứng dụng được xây dựng trên nền tảng công nghệ hiện đại, đảm bảo hiệu suất cao, bảo mật tối đa và trải nghiệm người dùng tuyệt vời.

## Sử dụng Ứng dụng

### 1. Đăng nhập/Đăng ký

**Bước 1**: Nhấp nút "Đăng nhập" ở góc trên phải  
**Bước 2**: Bạn sẽ được chuyển đến trang xác thực Manus  
**Bước 3**: Nhập email và mật khẩu (hoặc xác thực bằng phương thức khác)  
**Bước 4**: Xác nhận để hoàn tất đăng nhập

Lần đầu tiên, hệ thống sẽ tự động tạo tài khoản cho bạn.

### 2. Xem Danh sách Caregiver

**Bước 1**: Sau khi đăng nhập, nhấp "Xem tất cả Caregiver" hoặc chọn "Tìm Caregiver" từ trang chủ  
**Bước 2**: Bạn sẽ thấy danh sách người chăm sóc với thông tin:
- Tên và chuyên môn
- Kinh nghiệm (năm)
- Giá/giờ
- Đánh giá (sao)

**Bước 3**: Nhấp "Xem chi tiết" để biết thêm thông tin hoặc "Đặt dịch vụ" để tiếp tục

### 3. Đặt Dịch vụ

**Bước 1**: Chọn caregiver mà bạn muốn  
**Bước 2**: Nhấp "Đặt dịch vụ"  
**Bước 3**: Điền thông tin:
- **Ngày dịch vụ**: Chọn ngày và giờ bạn cần
- **Thời lượng**: Nhập số giờ dịch vụ (1-24 giờ)
- **Ghi chú**: Mô tả nhu cầu chăm sóc của bạn (tùy chọn)

**Bước 4**: Hệ thống sẽ tính toán tổng giá = Giá/giờ × Số giờ  
**Bước 5**: Nhấp "Xác nhận đặt dịch vụ"

Đơn đặt của bạn sẽ được lưu với trạng thái "Chờ xác nhận".

### 4. Xem Đơn Đặt của Tôi

**Bước 1**: Nhấp "Đơn đặt của tôi" từ menu chính  
**Bước 2**: Bạn sẽ thấy danh sách tất cả các đơn đặt với thông tin:
- Mã đơn
- Trạng thái (Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy)
- Ngày dịch vụ
- Thời lượng
- Giá
- Ghi chú

**Bước 3**: Để "Đặt lại" dịch vụ, nhấp nút "Đặt lại"

### 5. Đánh giá Dịch vụ

**Bước 1**: Vào "Đơn đặt của tôi"  
**Bước 2**: Tìm đơn đặt có trạng thái "Hoàn thành"  
**Bước 3**: Nhấp nút "Đánh giá"  
**Bước 4**: Một cửa sổ sẽ hiện ra, điền:
- **Mức đánh giá**: Chọn từ 1-5 sao (1 sao = Kém, 5 sao = Tuyệt vời)
- **Bình luận**: Chia sẻ trải nghiệm của bạn (tùy chọn)

**Bước 5**: Nhấp "Gửi đánh giá"

Đánh giá của bạn sẽ được lưu và cập nhật rating trung bình của caregiver.

## Quản lý Caregiver (Dành cho Admin)

### Truy cập Bảng Điều Khiển Admin

**Bước 1**: Đăng nhập bằng tài khoản Admin  
**Bước 2**: Nhấp "Bảng điều khiển Admin" từ trang chủ

### Thêm Caregiver Mới

**Bước 1**: Nhấp nút "Thêm Caregiver"  
**Bước 2**: Điền thông tin:
- **Tên** (bắt buộc)
- **Chuyên môn** (bắt buộc) - VD: "Chăm sóc người già"
- **Kinh nghiệm** (năm) (bắt buộc)
- **Giá/giờ** (VND) (bắt buộc)
- **Điện thoại** (bắt buộc)
- **Email** (bắt buộc)
- **Địa chỉ** (tùy chọn)
- **Giới thiệu** (tùy chọn)

**Bước 3**: Nhấp "Thêm mới"

### Sửa Thông tin Caregiver

**Bước 1**: Tìm caregiver cần sửa  
**Bước 2**: Nhấp nút "Sửa"  
**Bước 3**: Cập nhật thông tin  
**Bước 4**: Nhấp "Cập nhật"

### Xóa Caregiver

**Bước 1**: Tìm caregiver cần xóa  
**Bước 2**: Nhấp nút "Xóa"  
**Bước 3**: Xác nhận xóa

## Quản lý Tài khoản

### Xem Thông tin Cá nhân

**Bước 1**: Nhấp tên của bạn ở góc trên phải  
**Bước 2**: Xem thông tin tài khoản

### Đăng xuất

**Bước 1**: Nhấp tên của bạn ở góc trên phải  
**Bước 2**: Nhấp "Đăng xuất"

## Các Tính năng Chính

| Tính năng | Mô tả | Truy cập |
|---|---|---|
| Xem Caregiver | Duyệt danh sách người chăm sóc | Menu chính |
| Đặt Dịch vụ | Đặt lịch hẹn với caregiver | Trang Caregiver |
| Đánh giá | Để lại đánh giá sau dịch vụ | Đơn đặt của tôi |
| Quản lý Đơn | Xem lịch sử đặt dịch vụ | Menu chính |
| Quản lý Caregiver | Thêm/sửa/xóa caregiver (Admin) | Bảng điều khiển |

## Mẹo Sử dụng

1. **Kiểm tra Đánh giá**: Luôn xem đánh giá của caregiver trước khi đặt
2. **Ghi chú Chi tiết**: Viết ghi chú rõ ràng về nhu cầu chăm sóc
3. **Xác nhận Thông tin**: Kiểm tra lại ngày, giờ, giá trước khi xác nhận
4. **Đánh giá Trung Thực**: Chia sẻ trải nghiệm thực tế để giúp người khác
5. **Liên hệ Caregiver**: Sử dụng số điện thoại hoặc email từ danh sách

## Các Trạng thái Đơn Đặt

| Trạng thái | Ý nghĩa |
|---|---|
| Chờ xác nhận | Đơn vừa được tạo, chờ xác nhận |
| Đã xác nhận | Caregiver đã chấp nhận đơn |
| Hoàn thành | Dịch vụ đã hoàn tất, có thể đánh giá |
| Đã hủy | Đơn đã bị hủy |

## Hỗ trợ & Liên hệ

### Nếu gặp vấn đề:

1. **Không thể đăng nhập**
   - Kiểm tra email và mật khẩu
   - Xóa cache trình duyệt
   - Thử trình duyệt khác

2. **Lỗi khi đặt dịch vụ**
   - Kiểm tra kết nối internet
   - Tải lại trang
   - Liên hệ hỗ trợ

3. **Caregiver không hiển thị**
   - Tải lại trang
   - Kiểm tra xem caregiver có sẵn hay không

4. **Không thể gửi đánh giá**
   - Kiểm tra kết nối internet
   - Chắc chắn đơn đã hoàn thành
   - Thử lại sau

## Bảo mật & Quyền riêng tư

- Tài khoản của bạn được bảo vệ bằng Manus OAuth
- Thông tin cá nhân không được chia sẻ với bên thứ ba
- Tất cả dữ liệu được mã hóa khi truyền tải

## Thường Gặp (FAQ)

**Q: Tôi có thể hủy đơn đặt không?**  
A: Có, bạn có thể hủy đơn bằng cách cập nhật trạng thái thành "Đã hủy".

**Q: Giá có thay đổi không?**  
A: Giá được tính dựa trên giá/giờ của caregiver và số giờ dịch vụ.

**Q: Tôi có thể đặt dịch vụ cho tương lai không?**  
A: Có, bạn có thể chọn bất kỳ ngày nào trong tương lai.

**Q: Đánh giá có ảnh hưởng đến rating caregiver không?**  
A: Có, tất cả đánh giá sẽ được tính trung bình để cập nhật rating caregiver.

**Q: Tôi có thể thay đổi đơn đặt sau khi xác nhận không?**  
A: Bạn có thể liên hệ caregiver qua điện thoại hoặc email để thay đổi.

## Liên hệ

- **Email**: support@caregiverapp.com
- **Điện thoại**: 1900-XXXX
- **Website**: https://caregiverapp.com

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: Tháng 11 năm 2025  
**Trạng thái**: Hoạt động

Cảm ơn bạn đã sử dụng Caregiver Service Management App!
