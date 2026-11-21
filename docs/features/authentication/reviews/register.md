
# Authentication


## AUTH-T01 – Database & Entity

Status: Done

### Reviews

|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
| R01 | UUID generation phù hợp | Accepted | Accepted |
| R02 | Password nullable để hỗ trợ OAuth2 | Accepted | Accepted |
| R03 | Cần đặt default role trong Entity Builder | Accepted | Fixed |
| R04 | Mapping camelCase sang snake_case theo naming strategy | Accepted | Accepted |


## AUTH-T02 - Register DTO
Status: Done

### Reviews
|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01	|@Email nên có message riêng để thông báo khi email không hợp lệ.	|Accepted|	Fixed
|R02|	Không cần custom validator để kiểm tra password và confirmPassword trong DTO. Giữ logic kiểm tra tại AuthService.|	Accepted	|Accepted|
|R03|	RegisterResponse chỉ cần field message cho luồng Register hiện tại. Chưa cần bổ sung field khác.|	Accepted	|Accepted|


## AUTH-T03 - User Repository
Status: Done

### Reviews
|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01|	Kế thừa JpaRepository<User, UUID> phù hợp với User Entity.|	Accepted	|Accepted|
|R02	|existsByEmail(String email) phù hợp với nhu cầu kiểm tra email tồn tại.|	Accepted|	Accepted|


## AUTH-T04 - Register Service
Status: Done
### Reviews
|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01|	Kiểm tra password và confirmPassword trong Service|	Accepted	|Accepted|
|R02|	Dùng IllegalArgumentException cho email đã tồn tại	|Deferred	|Deferred|
|R03|	Mã hóa password trước khi lưu|	Accepted|	Accepted|
|R04|	Tạo User với role và trạng thái mặc định|	Accepted|	Accepted|
|R05|	Lưu User và trả RegisterResponse|	Accepted|	Accepted|

## AUTH-T05 - Exception Handling
Status: Done
### Reviews
|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01|	Xử lý IllegalArgumentException trả HTTP 400|	Accepted	|Accepted|
|R02|	Chỉ trả validation error đầu tiên|	Accepted|	Accepted|
|R03|	Xử lý HttpMessageNotReadableException|	Accepted	|Accepted|
|R04|	Phân biệt AccessDeniedException tự định nghĩa và của Spring Security|	Accepted|Accepted|
|R05|	ResourceNotFoundException trả HTTP 404|	Accepted|	Accepted|

## AUTH-T06 - Register Controller & Security
Status: Done

|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01	|AuthController mapping và trả HTTP 201	|Accepted	|Accepted|
|R02	|PasswordEncoder sử dụng BCrypt	|Accepted	|Accepted|
|R03	|Cho phép truy cập /api/v1/auth/**	|Accepted	|Accepted|
|R04	|Tắt CSRF trong API hiện tại|Accepted|	Accepted|
|R05	|Phân biệt HTTP 401 và 403|	Accepted	|Accepted|
|R06	|Tái sử dụng ErrorResponse cho Security errors|	Accepted	|Accepted|

## AUTH-T07 - Register Frontend

|Review ID|	Nội dung |	Quyết định|	Kết quả|
|---|---|---|---|
|R01	|Thiếu kiểm tra password và confirmPassword ở Frontend	|Accepted – nên sửa	|Verified|
|R02	|Password tối thiểu 8 ký tự chưa đồng nhất với Backend	|Cần xác nhận yêu cầu|	Verified|
|R03	|Trang /auth mặc định mở Login dù Backend Login chưa triển khai	|Cần xác nhận thiết kế	|Accepted|
|R04	|Có import không sử dụng	|Accepted – nên sửa	|Verified|
|R05	|Commit chứa nhiều component ngoài phạm vi AUTH-T07|	Đề xuất tách commit ở các lần sau|	Deferred|