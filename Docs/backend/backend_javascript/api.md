# API

The API calls to **Arogya** are done via HTTP requests, since we are hosting our
backend on a Node server. This was done to ensure low coupling between the
frontend and the backend. Follow this [Link]() to get example requests and
responses.

## Table of Contents

1. [User](#user)
2. [Hospital](#hospital)

## User

We breifly discuss the endpoints related to `users`

### Endpoints:

1. [Register](#register)
2. [Login](#login)
3. [Get User Profile](#get-user-profile)
4. [Logout](#logout)

#### Register

`POST /users/register`

Creates a new user account in the system.

##### Request Body

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "age": "number",
  "gender": "string"
}
```

##### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "age": 25,
  "gender": "male"
}
```

##### Field Requirements

- `email`: Valid email address (must match pattern /.+\@.+\..+/)
- `password`: Minimum 6 characters long
- `name`: Between 3 and 30 characters long
- `age`: Required number value
- `gender`: Must be one of: "male", "female", "other"

#### Validation Rules

- Email must be unique in the system.
- Password must be at least 8 characters long.
- Name must be at least 3 characters long.
- All fields are required.

##### Response

###### Success Response (201 Created)

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

###### Example Success Response

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

###### Error (400 Bad Request)

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

###### Example Error Responses

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

##### Notes

- The response includes a JWT token that expires in 1 hour.
- The password is not included in the response.
- The user's socketId field is optional and not required for registration.

#### Login

`POST /users/login`

Authenticates a user and returns their information along with an authentication
token.

##### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

##### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "securepass123"
}
```

##### Field Requirements

- `email`: Valid email address
- `password`: Minimum 8 characters long

##### Validation Rules

- Both email and password are required.
- Email must be a valid email format.
- Password must be at least 8 characters long.

##### Response

###### Success (200 OK)

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

###### Example Success Response

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

###### Error Responses

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

##### Notes

- The response includes a JWT token that expires in 1 hour.
- The password is not included in the response.
- Invalid credentials return a generic message for security reasons.
- The same validation rules for email and password apply as in registration.
- A secure HTTP-only cookie is set with the token.

#### Get User Profile

`GET /users/profile`

Retrieves the authenticated user's profile information.

##### Authentication

- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

##### Response

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
  "message": "Missing token"
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

#### Logout

`GET /users/logout`

Logs out the authenticated user by invalidating their current session token.

##### Authentication

- Requires valid JWT token.
- Token can be sent either in:
  - Cookie header as `token`.
  - Authorization header as `Bearer <token>`.

##### Response

###### Success (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

###### Error Responses

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

##### Notes

- The endpoint clears the authentication cookie.
- The current token is blacklisted to prevent reuse.
- All subsequent requests with the same token will be rejected.
- A new login is required to get a new valid token.

## Hospital

### Endpoints:

1. [Get All Hospitals](#get-all-hospitals)
2. [Get Hospital by ID](#get-hospital-by-id)
3. [Create Hospital](#create-hospital)
4. [Update Hospital](#update-hospital)
5. [Delete Hospital](#delete-hospital)

#### Get All Hospitals

`GET /hospitals`

Retrieves a list of all hospitals with their associated doctors.

##### Response

###### Success (200 OK)

```json
[
  {
    "id": "number",
    "name": "string",
    "addressStreet": "string",
    "addressCity": "string",
    "addressState": "string",
    "addressZip": "string",
    "addressCountry": "string",
    "contactNumber": "string",
    "email": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Doctors": [
      {
        "id": "number",
        "name": "string",
        "specialization": "string"
      }
    ]
  }
]
```

###### Example Success Response

```json
[
  {
    "id": 1,
    "name": "City General Hospital",
    "addressStreet": "123 Medical Center Drive",
    "addressCity": "New York",
    "addressState": "NY",
    "addressZip": "10001",
    "addressCountry": "USA",
    "contactNumber": "+1-555-0123",
    "email": "contact@citygeneral.com",
    "createdAt": "2024-03-08T12:34:56.789Z",
    "updatedAt": "2024-03-08T12:34:56.789Z",
    "Doctors": [
      {
        "id": 1,
        "name": "Dr. John Smith",
        "specialization": "Cardiology"
      }
    ]
  }
]
```

###### Error (500 Internal Server Error)

```json
{
  "message": "Error fetching hospitals"
}
```

#### Get Hospital by ID

`GET /hospitals/:id`

Retrieves a specific hospital's details by its ID.

##### URL Parameters

- `id`: Hospital's unique identifier

##### Response

###### Success (200 OK)

```json
{
  "id": "number",
  "name": "string",
  "addressStreet": "string",
  "addressCity": "string",
  "addressState": "string",
  "addressZip": "string",
  "addressCountry": "string",
  "contactNumber": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "Doctors": [
    {
      "id": "number",
      "name": "string",
      "specialization": "string"
    }
  ]
}
```

###### Error Responses

1. Hospital Not Found (404 Not Found)

```json
{
  "message": "Hospital not found"
}
```

2. Server Error (500 Internal Server Error)

```json
{
  "message": "Error fetching hospital"
}
```

#### Create Hospital

`POST /hospitals`

Creates a new hospital record.

##### Authentication

- Requires valid JWT token.
- Token can be sent either in:
  - Cookie header as `token`.
  - Authorization header as `Bearer <token>`.

##### Request Body

```json
{
  "name": "string",
  "addressStreet": "string",
  "addressCity": "string",
  "addressState": "string",
  "addressZip": "string",
  "addressCountry": "string",
  "contactNumber": "string",
  "email": "string"
}
```

##### Field Requirements

- `name`: Required, must be unique
- `addressStreet`: Required
- `addressCity`: Required
- `addressState`: Required
- `addressZip`: Required
- `addressCountry`: Required
- `contactNumber`: Required
- `email`: Required, must be valid email format and unique

##### Response

###### Success (201 Created)

```json
{
  "id": "number",
  "name": "string",
  "addressStreet": "string",
  "addressCity": "string",
  "addressState": "string",
  "addressZip": "string",
  "addressCountry": "string",
  "contactNumber": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

###### Error Responses

1. Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "body"
    }
  ]
}
```

2. Authentication Error (401 Unauthorized)

```json
{
  "message": "Missing token"
}
```

3. Server Error (500 Internal Server Error)

```json
{
  "message": "Error creating hospital"
}
```

#### Update Hospital

`PUT /hospitals/:id`

Updates an existing hospital's information.

##### Authentication

- Requires valid JWT token.
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

##### URL Parameters

- `id`: Hospital's unique identifier

##### Request Body

```json
{
  "name": "string",
  "addressStreet": "string",
  "addressCity": "string",
  "addressState": "string",
  "addressZip": "string",
  "addressCountry": "string",
  "contactNumber": "string",
  "email": "string"
}
```

##### Field Requirements

- All fields are optional for update.
- If provided, email must be valid and unique.
- If provided, name must be unique.

##### Response

###### Success (200 OK)

```json
{
  "id": "number",
  "name": "string",
  "addressStreet": "string",
  "addressCity": "string",
  "addressState": "string",
  "addressZip": "string",
  "addressCountry": "string",
  "contactNumber": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

###### Error Responses

1. Hospital Not Found (404 Not Found)

```json
{
  "message": "Hospital not found"
}
```

2. Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "body"
    }
  ]
}
```

3. Authentication Error (401 Unauthorized)

```json
{
  "message": "Missing token"
}
```

4. Server Error (500 Internal Server Error)

```json
{
  "message": "Error updating hospital"
}
```

#### Delete Hospital

`DELETE /hospitals/:id`

Deletes a hospital record.

##### Authentication

- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

##### URL Parameters

- `id`: Hospital's unique identifier

##### Response

###### Success (200 OK)

```json
{
  "message": "Hospital deleted successfully"
}
```

###### Error Responses

1. Hospital Not Found (404 Not Found)

```json
{
  "message": "Hospital not found"
}
```

2. Authentication Error (401 Unauthorized)

```json
{
  "message": "Missing token"
}
```

3. Server Error (500 Internal Server Error)

```json
{
  "message": "Error deleting hospital"
}
```

##### Notes

- Deleting a hospital will not delete associated doctors.
- All operations except GET require authentication.
- Email addresses must be unique across all hospitals.
- Hospital names must be unique across all hospitals.
