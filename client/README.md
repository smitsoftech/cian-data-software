## 4. All API Endpoints

### 4.1 customers Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/customers/all` | Get all customers | ✅ |
| POST | `/api/customers` | Create customers | ✅ |
| GET | `/api/customers/:id` | Get single customer | ✅ |
| PUT | `/api/customers/:id` | Update customer | ✅ |
| DELETE | `/api/customers/:id` | Delete customer | ✅ |

### 4.2 manufacturers Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/manufacturers/all` | Get all manufacturers | ✅ |
| POST | `/api/manufacturers/add` | Create manufacturers | ✅ |
| GET | `/api/manufacturers/:id` | Get single manufacturer | ✅ |
| PUT | `/api/manufacturers/:id` | Update manufacturer | ✅ |
| DELETE | `/api/manufacturers/:id` | Delete manufacturer | ✅ |

### 4.3 globalproducts Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/globalproducts/allget` | Get all global products | ✅ |
| POST | `/api/globalproducts` | Create global products | ✅ |
| GET | `/api/globalproducts/:id` | Get single global product | ✅ |
| PUT | `/api/globalproducts/:id` | Update global product | ✅ |
| DELETE | `/api/globalproducts/:id` | Delete global product | ✅ |


### 4.4 products Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/products` | Get all products | ✅ |
| POST | `/api/v1/products` | Create products | ✅ |
| GET | `/api/v1/products/:id` | Get single product | ✅ |
| PUT | `/api/v1/products/:id` | Update product | ✅ |
| DELETE | `/api/v1/products/:id` | Delete product | ✅ |

### 4.5 Users Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/users/register` | Register Users | ✅ |
| POST | `/api/v1/users/otp-verification` | verification otp users | ✅ |
| POST | `/api/v1/users/login` | Login users | ✅ |
| GET | `/api/v1/users/logout` | Logout users | ✅ |
| GET | `/api/v1/users/me` | My Profile user | ✅ |
| POST | `/api/v1/users/password/forgot` | ForgotPassword user | ✅ |
| PUT | `/api/v1/users/password/reset/:token` | Reset password user | ✅ |
| GET | `/api/v1/users/users` | Get All user | ✅ |
| DELETE | `/api/v1/users/deleteone/:id` | Delete one user | ✅ |
| PUT | `/api/v1/users/updateRole/:id` | Update user role | ✅ |

### 4.6 Audit Log Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/audit-logs` | View access logs | ✅ |
| GET | `/api/v1/audit-logs/password/:id` | Logs for specific password | ✅ |

