### **1. Overview**

Mục đích của luồng là để người dùng đăng nhập vào hệ thống.

### **2. Main Flow**

Luồng đăng nhập thành công:

1. Người dùng truy cập trang Login.
2. Nhập email và password.
3. Frontend validate dữ liệu.
4. Frontend gửi request đến Backend.
5. Backend tìm User theo email.
6. Backend kiểm tra trạng thái tài khoản.
7. Backend xác thực password.
8. Backend tạo Access Token và Refresh Token.
9. Backend trả response cho Frontend.
10. Frontend lưu token.
11. Frontend chuyển hướng đến Home.

### **3. Alternative Flows**

Các trường hợp khác:

- Email không tồn tại.
- Password không chính xác.
- Tài khoản bị vô hiệu hóa.
- Dữ liệu đầu vào không hợp lệ.
- Server xảy ra lỗi.

### **4. Post-login Behavior**

Mô tả hành vi sau khi đăng nhập:

- Truy cập các trang yêu cầu authentication.
- Gửi Access Token khi gọi API.
- Xử lý khi người dùng đã đăng nhập nhưng truy cập lại Login.

### **5. Task List**

Giữ bảng Task như hiện tại:

| Task ID  | Task              | Status | Commit                                   |
| -------- | ----------------- | ------ | ---------------------------------------- |
| AUTH-T08 | LoginRequest DTO  | Done   | b7f46b003b460b66d7b2c6a68dcff6a2261213b0 |
| AUTH-T09 | User Repository   | Done   | 1bbb52da34b7b3abf6072a387da8473b7fcac01a |
| AUTH-T10 | JWT Service       | Done   | e2845b5ca055cb0a50605349425b293ad2a9be61 |
| AUTH-T11 | Login Service     | Done   | 553fe73a86fe1980b13fb5b0c57096d638ad0df2 |
| AUTH-T12 | LoginResponse DTO | Done   | 553fe73a86fe1980b13fb5b0c57096d638ad0df2 |
| AUTH-T13 | Controller        | Done   | 553fe73a86fe1980b13fb5b0c57096d638ad0df2 |
| AUTH-T14 | Login Frontend    | Done   | 6b652cab3b9739be37224f5d9661e0872bf2a58d |
