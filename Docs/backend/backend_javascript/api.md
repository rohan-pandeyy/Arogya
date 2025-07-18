# API

The API calls to **Arogya** are done via HTTP requests, since we are hosting our backend on a Node server. This ensures low coupling between the frontend and backend. Example requests and responses are available in the documentation.
Click this [Link](https://rohanpandey-606493.postman.co/workspace/Rohan-Pandey's-Workspace~c6a98fc1-e739-4c85-8733-b586ea2510f0/collection/45489572-f3c27514-006e-40e9-8ddc-44c1b57940a5?action=share&creator=45489572) to see examplary requests and responses on POSTMAN.

## Table of Contents

1. [User](#user)
2. [Auth](#auth)
3. [Facility](#facility)

---

## User

Endpoints related to user profile and role management.

### Endpoints

1. [Get Current User Profile](#get-current-user-profile)
2. [Update Current User Profile](#update-current-user-profile)
3. [Become Patient](#become-patient)

#### Get Current User Profile

`GET /api/users/me`

Retrieves the authenticated user's complete profile, including all role-specific info.

- **Authentication:** Requires JWT in `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "age": 25,
  "gender": "male",
  "phone": "string",
  "Roles": [
    { "name": "patient" }
  ],
  "Patient": {
    "id": "string",
    "address": "string",
    "bloodGroup": "string"
  },
  "Doctor": {
    "id": "string",
    "licenseNumber": "string",
    "specialization": "string",
    "yearsOfExperience": 5,
    "facility": {
      "id": "string",
      "name": "string"
    }
  },
  "Staff": {
    "id": "string",
    "role": "receptionist",
    "facility": {
      "id": "string",
      "name": "string"
    }
  }
}
```
- Only the relevant role-specific profile(s) will be present.

**Errors:**
- `401 Unauthorized` if token is missing or invalid.

---

#### Update Current User Profile

`PATCH /api/users/me`

Updates the authenticated user's base profile (name, age, gender, phone).

- **Authentication:** Requires JWT

**Request Body:**
```json
{
  "name": "string",
  "age": 30,
  "gender": "male",
  "phone": "string"
}
```
- All fields are optional; only provided fields will be updated.

**Response (200 OK):**
```json
{ "message": "Profile updated successfully." }
```

**Errors:**
- `400 Bad Request` if no valid fields provided.
- `404 Not Found` if user not found.

---

#### Become Patient

`POST /api/users/become-patient`

Adds the 'patient' role and profile to the currently logged-in user.

- **Authentication:** Requires JWT

**Request Body Example:**
```json
{
  "address": "123 Main St",
  "bloodGroup": "O+"
}
```

**Response (201 Created):**
```json
{ "message": "Successfully registered as a patient." }
```

**Errors:**
- `409 Conflict` if user is already a patient.
- `500 Internal Server Error` for other issues.

---

## Auth

Endpoints for registration, login, and logout.

### Endpoints

1. [Register](#register)
2. [Login](#login)
3. [Logout](#logout)

#### Register

`POST /api/auth/register`

Creates a new user account with one or more roles.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "roles": ["patient", "doctor"],
  "patientProfile": { "address": "string", "bloodGroup": "string" },
  "doctorProfile": {
    "licenseNumber": "string",
    "specialization": "string",
    "yearsOfExperience": 5,
    "facilityId": "string"
  },
  "staffProfile": {
    "facilityId": "string",
    "role": "receptionist"
  }
}
```
- `roles` is an array of role names (`patient`, `doctor`, `staff`).
- Role-specific profile objects are required if the corresponding role is present.

**Response (201 Created):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "Roles": [{ "name": "patient" }]
  },
  "token": "string"
}
```

**Errors:**
- `409 Conflict` if email already exists.
- `400 Bad Request` for invalid roles or missing required profile data.

---

#### Login

`POST /api/auth/login`

Authenticates a user and returns a JWT.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  },
  "token": "string"
}
```

**Errors:**
- `401 Unauthorized` for invalid credentials.

---

#### Logout

`POST /api/auth/logout`

Logs out the authenticated user by blacklisting their current token.

- **Authentication:** Requires JWT

**Response (200 OK):**
```json
{ "message": "Successfully logged out." }
```

**Errors:**
- `400 Bad Request` if no token provided.

---

## Facility

Endpoints for managing healthcare facilities (hospitals, clinics, etc.).

### Endpoints

1. [Create Facility](#create-facility)
2. [Get All Facilities](#get-all-facilities)
3. [Get Facility by ID](#get-facility-by-id)
4. [Update Facility](#update-facility)

#### Create Facility

`POST /api/facilities`

Creates a new facility. Can only be doen via POSTMAN itself.

- **Authentication:** Admin only

**Request Body:**
```json
{
  "name": "string",
  "type": "hospital",
  "address": "string",
  "contactNumber": "string"
}
```

**Response (201 Created):**
```json
{
  "id": "string",
  "name": "string",
  "type": "hospital",
  "address": "string",
  "contactNumber": "string"
}
```

**Errors:**
- `409 Conflict` if facility name already exists.

---

#### Get All Facilities

`GET /api/facilities`

Returns a list of all facilities.

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "name": "string",
    "type": "hospital",
    "address": "string",
    "contactNumber": "string"
  }
]
```

---

#### Get Facility by ID

`GET /api/facilities/<id>`

Returns a facility with its doctors and staff.

**Response (200 OK):**
```json
{
  "id": "string",
  "name": "string",
  "type": "hospital",
  "address": "string",
  "contactNumber": "string",
  "doctors": [
    {
      "id": "string",
      "licenseNumber": "string",
      "specialization": "string",
      "User": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  ],
  "staffMembers": [
    {
      "id": "string",
      "role": "receptionist",
      "User": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  ]
}
```

**Errors:**
- `404 Not Found` if facility does not exist.

---

#### Update Facility

`PATCH /api/facilities/:id`

Updates a facility's information.

- **Authentication:** Admin only

**Request Body:** (any updatable fields)
```json
{
  "name": "string",
  "type": "clinic",
  "address": "string",
  "contactNumber": "string"
}
```

**Response (200 OK):**
```json
{ "message": "Facility updated successfully." }
```

**Errors:**
- `404 Not Found` if facility does not exist.

---

## Notes

- All endpoints requiring authentication expect a JWT in the `Authorization` header as `Bearer <token>`.
- Passwords are never returned in any API response.
- Role-based access is enforced for sensitive endpoints (e.g., facility creation and update).
- The API uses UUIDs for all primary keys.
- The `/api/auth/logout` endpoint blacklists the token for its remaining lifetime.
- The legacy `/users/register`, `/users/login`, `/users/profile`, and `/users/logout` endpoints are replaced by `/api/auth/*` and `/api/users/me`.
