
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