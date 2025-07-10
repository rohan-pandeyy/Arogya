# Manual Setup Guide

## Initial Steps:

This section instructs how you may manually set up your project locally. To get
a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- Node.js and npm </br> Download and install from: https://nodejs.org/

- PostgreSQL </br> Install PostgreSQL from: https://www.postgresql.org/download/
- Project Structure

  ```
  arogya/
  ├── Arogya/         # Frontend (Next.js)
  ├── Backend/        # Backend (Express)
  └── .env            # Environment config file (to be created)

  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/rohan-pandeyy/arogya.git
   cd arogya
   ```
2. Install dependencies
   ```sh
   cd Arogya
   npm install
   cd ../Backend
   npm install
   ```
3. Create `.env` file</br> Inside the ./Backend directory of the project, create
   a .env file with the following content:

   ```env
   PORT=80
   DATABASE_URL=postgres://<username>:<password>@localhost:5432/<db_name>
   JWT_SECRET_KEY=arogya-secret
   ```

   Replace `<username>`, `<password>`, and `<db_name>` with your actual
   PostgreSQL credentials and desired database name.

4. Set up PostgreSQL database

   If PostgreSQL is not installed, install it using the link above.</br> Then
   open the terminal or PostgreSQL shell and run:

   ```sql
   CREATE DATABASE <db_name>;
   ```

   Make sure this name matches the one you used in the `.env` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running the Application

In separate terminals:

- Start the backend server
  ```bash
  cd Backend
  npx nodemon
  ```
- Start the frontend server
  ```bash
  cd Arogya
  npm run dev
  ```
