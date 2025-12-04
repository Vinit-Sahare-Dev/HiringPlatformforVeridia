# Frontend-Backend Connection Test Guide

## Test Login/Register Connection

### 1. Start Backend Server
```bash
cd backend
mvn spring-boot:run
```
Verify backend is running at: http://localhost:8080

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```
Verify frontend is running at: http://localhost:5173

### 3. Test API Endpoints

#### Test Register API
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Login API
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Browser Testing
1. Open http://localhost:5173
2. Try to register a new account
3. Check browser console (F12) for any errors
4. Try to login with the registered account

### 5. Common Issues & Solutions

#### CORS Issues
- Check browser console for CORS errors
- Verify backend CORS configuration
- Ensure both servers are running

#### Connection Refused
- Backend server not started
- Wrong port in frontend API configuration
- Firewall blocking connection

#### Database Issues
- MySQL not running
- Wrong database credentials
- Database not created

### 6. Debug Steps
1. Check backend logs for errors
2. Check browser console for network errors
3. Verify API endpoints with Postman/curl
4. Check database connection

### 7. Expected Responses

#### Successful Register
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "test@example.com",
  "name": "Test User",
  "role": "CANDIDATE"
}
```

#### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "test@example.com",
  "name": "Test User",
  "role": "CANDIDATE"
}
```

#### Admin Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@veridia.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```
