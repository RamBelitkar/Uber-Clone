# Uber Project Backend

This repository contains the backend implementation for the Uber Project. The project is designed to handle various functionalities such as user and captain registration, authentication, and more.

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

---

### **3. Register Captain**

**Endpoint**:  
`POST /captain/register`

**Description**:  
Registers a new captain in the system. Similar to the user registration process but also includes vehicle details.

**Request Body**:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "janesmith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "Car"
  }
}
```

**Validation**:
- All validations for `fullname`, `email`, and `password` are the same as for users.
- `vehicle.capacity`: Must be an integer.
- `vehicle.vehicleType`: Must be a valid string.

**Response**:

- **Success** (`201 Created`):
  ```json
  {
    "message": "New captain registered",
    "newCaptain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "janesmith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC-1234",
        "capacity": 4,
        "vehicleType": "Car"
      }
    },
    "token": "your-jwt-token"
  }
  ```

- **Validation Error** (`400 Bad Request`):
  ```json
  {
    "errors": [
      {
        "msg": "Invalid vehicleType",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

---

### **4. Login Captain**

**Endpoint**:  
`POST /captain/login`

**Description**:  
Logs in an existing captain using their email and password. The process is the same as the user login.

**Request Body**:
```json
{
  "email": "janesmith@example.com",
  "password": "yourpassword"
}
```

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

---

### **5. Logout (User and Captain)**

**Endpoint**:  
`POST /logout`

**Description**:  
Logs out the currently authenticated user or captain by blacklisting their token.

**Request Header**:
```json
{
  "Authorization": "Bearer <jwt-token>"
}
```

**Response**:

- **Success** (`200 OK`):
  ```json
  {
    "message": "Logout successful"
  }
  ```

- **Unauthorized** (`401 Unauthorized`):
  ```json
  {
    "message": "Unauthorized, Invalid or expired token"
  }
  ```

**Notes**:
- The JWT token is invalidated by adding it to the blacklist collection.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM library for MongoDB.
- **express-validator**: Middleware for request validation.
- **jsonwebtoken**: For token-based authentication.

---
