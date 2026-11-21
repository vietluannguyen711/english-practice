
# Authentication

## Flow: Register

| Task ID | Task | Status |
|---|---|---|
| AUTH-T01 | Database & Entity | Done |
| AUTH-T02 | Register DTO | Done |
| AUTH-T03 | User Repository | Done |
| AUTH-T04 | Register Service | Done |
| AUTH-T05 | Exception Handling | Todo |
| AUTH-T06 | Register Controller & Security | Todo |
| AUTH-T07 | Register Frontend | Todo |



## AUTH-T01 – Database & Entity

Status: Done

### Reviews

| ID | Nội dung | Quyết định | Status |
|---|---|---|---|
| R01 | UUID generation phù hợp | Accepted | Accepted |
| R02 | Password nullable để hỗ trợ OAuth2 | Accepted | Accepted |
| R03 | Cần đặt default role trong Entity Builder | Accepted | Fixed |
| R04 | Mapping camelCase sang snake_case theo naming strategy | Accepted | Accepted |


## AUTH-T02 - Register DTO
Status: Done

### Reviews
|Review ID|	Nội dung review|	Quyết định|	Status|
|---|---|---|---|
|R01	|@Email nên có message riêng để thông báo khi email không hợp lệ.	|Accepted|	Fixed
|R02|	Không cần custom validator để kiểm tra password và confirmPassword trong DTO. Giữ logic kiểm tra tại AuthService.|	Accepted	|Accepted|
|R03|	RegisterResponse chỉ cần field message cho luồng Register hiện tại. Chưa cần bổ sung field khác.|	Accepted	|Accepted|


## AUTH-T03 - User Repository
Status: Done

### Reviews
|Review ID|	Nội dung review|	Quyết định|	Status|
|---|---|---|---|
|R01|	Kế thừa JpaRepository<User, UUID> phù hợp với User Entity.|	Accepted	|Accepted|
|R02	|existsByEmail(String email) phù hợp với nhu cầu kiểm tra email tồn tại.|	Accepted|	Accepted|


## AUTH-T04 - Register Service
Status: Done
### Reviews
|Review ID	|Nội dung	|Quyết định	|Status|
|---|---|---|---|
|R01|	Kiểm tra password và confirmPassword trong Service|	Accepted	|Accepted|
|R02|	Dùng IllegalArgumentException cho email đã tồn tại	|Deferred	|Deferred|
|R03|	Mã hóa password trước khi lưu|	Accepted|	Accepted|
|R04|	Tạo User với role và trạng thái mặc định|	Accepted|	Accepted|
|R05|	Lưu User và trả RegisterResponse|	Accepted|	Accepted|