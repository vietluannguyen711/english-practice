### **1. Overview**

Mục đích của luồng là cho phép người dùng đăng xuất khỏi hệ thống.

### **2. Main Flow**

1. Người dùng nhấn nút Logout.
2. Frontend gọi Logout Server Action.
3. Server Action xóa Access Token và Refresh Token khỏi cookies.
4. Redirect người dùng về trang Login.

### **3. Post-logout Behavior**

- Người dùng không còn được xem là đã đăng nhập.
- Khi truy cập các trang yêu cầu Authentication, người dùng được redirect đến trang Login.
- Các API request yêu cầu Authentication sẽ không còn Access Token hợp lệ từ phiên đăng nhập đã xóa.

### **4. Task List**

Task List

| Task ID  | Task                                                     | Status |
| -------- | -------------------------------------------------------- | ------ |
| AUTH-T15 | Logout button trên Header cùng với Nav, layout Dashboard |        |
| AUTH-T16 | Logout action                                            |        |
| AUTH-T17 | Cập nhật Header                                          |        |
