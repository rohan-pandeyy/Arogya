# Arogya Backend

This is the backend server for the Arogya application, a robust and scalable
healthcare platform. It is built with Node.js, Express.js, and PostgreSQL,
following a modern, role-based architecture to support various user types like
patients, doctors, and staff.

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

## Structure

```
Backend/
├── config/         # Configuration files and database setup
├── controllers/    # Request handlers and business logic
├── middlewares/    # Custom middleware functions (auth, role checks)
├── models/         # Sequelize models and associations
├── routes/         # API route definitions
├── services/       # Business logic and external service integrations
├── app.js          # Main Express application setup (middleware, routes)
└── server.js       # Server entry point (starts the HTTP server)
```

## Development

- The server runs on port 3000 by default (configurable via environment
  variables)
- API documentation is available in the `../Docs` directory
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

The application implements centralized error handling with appropriate HTTP
status codes and error messages for different scenarios.

## Contributing

1. Follow the existing code structure and patterns
2. Ensure proper error handling and input validation
3. Add appropriate comments and documentation
4. Test your changes thoroughly
5. Update the API documentation if necessary

## License

This project is licensed under the ISC License.
