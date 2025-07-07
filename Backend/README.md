# Arogya Backend

This is the backend server for the Arogya application, built using Node.js and Express.js. The backend provides a robust API layer for the Arogya healthcare platform, handling user authentication, data management, and business logic.

## Tech Stack

- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Input Validation**: express-validator
- **Environment Variables**: dotenv
- **CORS Support**: cors
- **Cookie Handling**: cookie-parser

## Project Structure

```
Backend/
├── config/         # Configuration files and database setup
├── controllers/    # Request handlers and business logic
├── docs/          # API documentation and specifications
├── middlewares/   # Custom middleware functions
├── models/        # Database models and schemas
├── routes/        # API route definitions
├── services/      # Business logic and external service integrations
├── app.js         # Express application setup
└── server.js      # Server entry point
```

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - PostgreSQL database
   - npm or yarn package manager

2. **Installation**

   ```bash
   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Configure the following environment variables:
     - Database connection details
     - JWT secret key
     - Server port
     - Other configuration variables

4. **Running the Server**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

## Development

- The server runs on port 3000 by default (configurable via environment variables)
- API documentation is available in the `/docs` directory
- The application follows MVC (Model-View-Controller) architecture
- Sequelize is used as the ORM for database operations
- JWT-based authentication is implemented for secure API access

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- CORS protection
- Input validation using express-validator
- Secure cookie handling

## Error Handling

The application implements centralized error handling with appropriate HTTP status codes and error messages for different scenarios.

## Contributing

1. Follow the existing code structure and patterns
2. Ensure proper error handling and input validation
3. Add appropriate comments and documentation
4. Test your changes thoroughly
5. Update the API documentation if necessary

## License

This project is licensed under the ISC License.
