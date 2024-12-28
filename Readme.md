Here’s the updated `README.md` with the added login route:

---

# Uber Project Backend

This repository contains the backend implementation for the Uber Project. The project is designed to handle various functionalities such as user registration, authentication, and more.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd uber-project-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and configure your environment variables (e.g., database connection string, JWT secret).

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:<port>` (default port is `3000` unless specified otherwise in the `.env` file).

---

## API Endpoints
### Updated API Endpoints Documentation

---

### **1. Register User**

**Endpoint**:  
`POST /user/register`

**Description**:  
Registers a new user in the system.

**Request Body**:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

**Validation**:
- `email`: Must be a valid email.
- `password`: Must be at least 3 characters long.
- `fullname.firstname`: Must be at least 3 characters long.

**Response**:

- **Success** (`201 Created`):
  ```json
  {
    "message": "New user created",
    "newUser": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    },
    "token": "your-jwt-token"
  }
  ```

- **Validation Error** (`400 Bad Request`):
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **User Already Exists** (`400 Bad Request`):
  ```json
  {
    "message": "User already exists",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

---

### **2. Login User**

**Endpoint**:  
`POST /user/login`

**Description**:  
Logs in an existing user by verifying their email and password.

**Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

**Validation**:
- `email`: Must be a valid email.
- `password`: Must not be empty.

**Response**:

- **Success** (`200 OK`):
  ```json
  {
    "message": "Login successful",
    "token": "your-jwt-token"
  }
  ```

- **Validation Error** (`400 Bad Request`):
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Invalid Credentials** (`401 Unauthorized`):
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

**Notes**:
- Ensure the user exists in the database.
- The response includes a JWT token for authenticated sessions.

---

### **3. Get User Profile**

**Endpoint**:  
`GET /user/profile`

**Description**:  
Fetches the profile details of the currently authenticated user.

**Authentication Middleware**:  
This endpoint requires the user to be authenticated via JWT. The token must be included in the `Authorization` header as a Bearer token.

**Request Header**:
```json
{
  "Authorization": "Bearer <jwt-token>"
}
```

**Middleware Logic**:  
The middleware verifies the provided JWT token and extracts the user information from the decoded payload. If the token is valid, it proceeds to the handler, which fetches the user's profile information. If the token is invalid or expired, it returns a `401 Unauthorized` error.

**Response**:

- **Success** (`200 OK`):
  ```json
  {
    "message": "Profile fetched successfully",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

- **Unauthorized** (`401 Unauthorized`):
  ```json
  {
    "message": "Unauthorized, Invalid or expired token"
  }
  ```

**Notes**:
- The JWT token in the `Authorization` header is required to fetch the user profile.
- The middleware ensures that only authenticated users can access this endpoint.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM library for MongoDB.
- **express-validator**: Middleware for request validation.
- **jsonwebtoken**: For token-based authentication.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
