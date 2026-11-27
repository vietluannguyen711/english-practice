# Authentication

## AUTH-T08 | LoginRequest DTO

Status: Done

### Reviews

| Review ID | Nội dung                        | Kết quả  |
| --------- | ------------------------------- | -------- |
| R01       | Bổ sung @Email                  | Verified |
| R02       | Bỏ @Size(min = 8) khỏi password | Verified |

## AUTH-T09 | User Repository.

Verified

### Reviews

| Review ID | Nội dung                                     | Kết quả  |
| --------- | -------------------------------------------- | -------- |
| R01       | findByEmail() trả về Optional<User>          | Verified |
| R02       | findByUsername() trả về Optional<User>       | Verified |
| R03       | existsByUsername() kiểm tra username tồn tại | Verified |

## AUTH-T10 | JWT Service

| Review ID | Nội dung                                                                          | Mức độ   |
| --------- | --------------------------------------------------------------------------------- | -------- |
| R01       | JWT secret đang được ghi trực tiếp trong .vscode/launch.json đã được Git theo dõi | Verified |

## AUTH-T11 – Login Service

| Review ID | Nội dung                                                                                                                            | Quyết định | Kết quả  |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| R01       | Đăng nhập thất bại phải trả HTTP 401 Unauthorized thay vì HTTP 400 Bad Request.                                                     | Accepted   | Verified |
| R02       | Sử dụng cùng thông báo lỗi cho email không tồn tại, mật khẩu sai và tài khoản bị vô hiệu hóa để tránh tiết lộ trạng thái tài khoản. | Accepted   | Verified |

## AUTH-T12 – LoginResponse DTO

Không phát hiện vấn đề cần xử lý trong quá trình review.

**Result: Verified**

## AUTH-T13 – Login Controller

Không phát hiện vấn đề cần xử lý trong quá trình review.

**Result: Verified**
