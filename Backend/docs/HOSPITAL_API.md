# Hospital API Documentation

## Endpoints

### Get All Hospitals
`GET /hospitals`

Retrieves a list of all hospitals with their associated doctors.

#### Response

##### Success (200 OK)
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

##### Example Success Response
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

##### Error (500 Internal Server Error)
```json
{
    "message": "Error fetching hospitals"
}
```

### Get Hospital by ID
`GET /hospitals/:id`

Retrieves a specific hospital's details by its ID.

#### URL Parameters
- `id`: Hospital's unique identifier

#### Response

##### Success (200 OK)
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

##### Error Responses

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

### Create Hospital
`POST /hospitals`

Creates a new hospital record.

#### Authentication
- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

#### Request Body
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

#### Field Requirements
- `name`: Required, must be unique
- `addressStreet`: Required
- `addressCity`: Required
- `addressState`: Required
- `addressZip`: Required
- `addressCountry`: Required
- `contactNumber`: Required
- `email`: Required, must be valid email format and unique

#### Response

##### Success (201 Created)
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

##### Error Responses

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

### Update Hospital
`PUT /hospitals/:id`

Updates an existing hospital's information.

#### Authentication
- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

#### URL Parameters
- `id`: Hospital's unique identifier

#### Request Body
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

#### Field Requirements
- All fields are optional for update
- If provided, email must be valid and unique
- If provided, name must be unique

#### Response

##### Success (200 OK)
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

##### Error Responses

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

### Delete Hospital
`DELETE /hospitals/:id`

Deletes a hospital record.

#### Authentication
- Requires valid JWT token
- Token can be sent either in:
  - Cookie header as `token`
  - Authorization header as `Bearer <token>`

#### URL Parameters
- `id`: Hospital's unique identifier

#### Response

##### Success (200 OK)
```json
{
    "message": "Hospital deleted successfully"
}
```

##### Error Responses

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

#### Notes
- Deleting a hospital will not delete associated doctors
- All operations except GET require authentication
- Email addresses must be unique across all hospitals
- Hospital names must be unique across all hospitals 