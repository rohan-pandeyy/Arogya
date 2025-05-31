# User API Documentation

## Endpoints

### Register User
`POST /users/register`

Creates a new user account in the system.

#### Request Body
```json
{
    "email": "string",
    "password": "string",
    "name": "string",
    "age": "number",
    "gender": "string"
}
```

#### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securepass123",
    "name": "John Doe",
    "age": 25,
    "gender": "male"
}
```

#### Field Requirements
- `email`: Valid email address (must match pattern /.+\@.+\..+/)
- `password`: Minimum 8 characters long
- `name`: Between 3 and 30 characters long
- `age`: Required number value
- `gender`: Must be one of: "male", "female", "other"

#### Validation Rules
- Email must be unique in the system
- Password must be at least 8 characters long
- Name must be at least 3 characters long
- All fields are required

#### Response

##### Success (201 Created)
```json
{
    "token": "string",
    "user": {
        "email": "string",
        "name": "string",
        "age": "number",
        "gender": "string",
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

##### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY0YzM5YzM5YzM5YzM5YzM5YzM5YzMiLCJpYXQiOjE3MDk5MjM0NTYsImV4cCI6MTcwOTkyNzA1Nn0.example",
    "user": {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 25,
        "gender": "male",
        "_id": "65f4c39c39c39c39c39c39c3",
        "createdAt": "2024-03-08T12:34:56.789Z",
        "updatedAt": "2024-03-08T12:34:56.789Z"
    }
}
```

##### Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "string",
            "param": "string",
            "location": "string"
        }
    ]
}
```

##### Example Error Responses

1. Invalid Email Format:
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

2. Password Too Short:
```json
{
    "errors": [
        {
            "msg": "Password must be at least 8 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

3. Missing Required Field:
```json
{
    "errors": [
        {
            "msg": "All fields are required",
            "param": "age",
            "location": "body"
        }
    ]
}
```

#### Notes
- The response includes a JWT token that expires in 1 hour
- The password is not included in the response
- The user's socketId field is optional and not required for registration 

### Login User
`POST /users/login`

Authenticates a user and returns their information along with an authentication token.

#### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

#### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securepass123"
}
```

#### Field Requirements
- `email`: Valid email address
- `password`: Minimum 8 characters long

#### Validation Rules
- Both email and password are required
- Email must be a valid email format
- Password must be at least 8 characters long

#### Response

##### Success (200 OK)
```json
{
    "token": "string",
    "user": {
        "email": "string",
        "name": "string",
        "age": "number",
        "gender": "string",
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

##### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY0YzM5YzM5YzM5YzM5YzM5YzM5YzMiLCJpYXQiOjE3MDk5MjM0NTYsImV4cCI6MTcwOTkyNzA1Nn0.example",
    "user": {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 25,
        "gender": "male",
        "_id": "65f4c39c39c39c39c39c39c3",
        "createdAt": "2024-03-08T12:34:56.789Z",
        "updatedAt": "2024-03-08T12:34:56.789Z"
    }
}
```

##### Error Responses

1. Invalid Credentials (401 Unauthorized)
```json
{
    "message": "Invalid email or password"
}
```

2. Validation Error (400 Bad Request)
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

#### Notes
- The response includes a JWT token that expires in 1 hour
- The password is not included in the response
- Invalid credentials return a generic message for security reasons
- The same validation rules for email and password apply as in registration 

### Get User Profile
`GET /users/profile`

Retrieves the authenticated user's profile information.

#### Authentication
- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

#### Response

##### Success (200 OK)
```json
{
    "email": "string",
    "name": "string",
    "age": "number",
    "gender": "string",
    "_id": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

##### Example Success Response
```json
{
    "email": "john.doe@example.com",
    "name": "John Doe",
    "age": 25,
    "gender": "male",
    "_id": "65f4c39c39c39c39c39c39c3",
    "createdAt": "2024-03-08T12:34:56.789Z",
    "updatedAt": "2024-03-08T12:34:56.789Z"
}
```

##### Error Responses

1. Missing Token (401 Unauthorized)
```json
{
    "message": "Invalid token"
}
```

2. Invalid Token (401 Unauthorized)
```json
{
    "message": "Invalid token"
}
```

3. User Not Found (401 Unauthorized)
```json
{
    "message": "User not found"
}
```

### Logout User
`GET /users/logout`

Logs out the authenticated user by invalidating their current session token.

#### Authentication
- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

#### Response

##### Success (200 OK)
```json
{
    "message": "Logged out successfully"
}
```

##### Error Responses

1. Missing Token (401 Unauthorized)
```json
{
    "message": "Missing token"
}
```

2. Invalid Token (401 Unauthorized)
```json
{
    "message": "Invalid token"
}
```

#### Notes
- The endpoint clears the authentication cookie
- The current token is blacklisted to prevent reuse
- All subsequent requests with the same token will be rejected
- A new login is required to get a new valid token 