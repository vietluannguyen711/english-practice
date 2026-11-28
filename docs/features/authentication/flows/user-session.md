### **1. Overview**

Mục đích của luồng là hiển thị đúng trạng thái của người dùng trên Header trước và sau khi đăng nhập hệ thống.

### 2. Main Flow

1. Người dùng truy cập trang Home hoặc một trang bất kỳ.
2. Header lấy thông tin người dùng hiện tại thông qua Get Current User Action.
3. Action gọi Backend API `GET /api/v1/users/me`.
4. Backend xác thực Access Token và trả thông tin User nếu hợp lệ.
5. Header cập nhật UI theo trạng thái Authentication:
   - Đã đăng nhập: Hiển thị Avatar, tên người dùng và Logout button.
   - Chưa đăng nhập: Hiển thị Login và Register.
6. Sau khi Login thành công, người dùng được redirect về Home và Header hiển thị trạng thái đã đăng nhập.
7. Sau khi Logout, Header chuyển về trạng thái chưa đăng nhập.

### 3. Post-login / Post-logout Behavior

- Khi người dùng đã đăng nhập, Header hiển thị thông tin User.
- Khi người dùng chưa đăng nhập hoặc Access Token không hợp lệ, Header hiển thị Login/Register.
- Khi Logout thành công, Header cập nhật về trạng thái chưa đăng nhập.

### **3. Task List**

| Task ID  | Task                                                                               | Status | Commit                                   |
| -------- | ---------------------------------------------------------------------------------- | ------ | ---------------------------------------- |
| AUTH-T17 | Get Current User API Backend GET /api/v1/users/me                                  | Done   | 04f6ad69b370d031969f9c268cf3421900197d2b |
| AUTH-T18 | Get Current User Action Frontend Server Action gọi API và lấy thông tin User       |        |                                          |
| AUTH-T19 | Update Header UI Hiển thị Login/Register hoặc Avatar tùy trạng thái Authentication |        |                                          |
