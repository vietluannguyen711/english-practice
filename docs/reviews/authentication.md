
# Authentication

## Flow: Register

| Task ID | Task | Status |
|---|---|---|
| AUTH-T01 | Database & Entity | Todo |
| AUTH-T02 | Register DTO | Todo |
| AUTH-T03 | User Repository | Todo |
| AUTH-T04 | Register Service | Todo |
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