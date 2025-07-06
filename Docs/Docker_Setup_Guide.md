# Docker Setup for Local Development

This project provides a ready-to-use Docker development environment with hot-reloading support for both the frontend `(Next.js)` and backend `(Express + PostgreSQL)`.

## Prerequisites

Before you proceed, ensure the following tools are installed in your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (comes with Docker Desktop)

You can verify the installations by running:

```bash
docker --version
docker-compose --version
```

## Getting Started

1. Clone the repo (if you haven't already):
   ```bash
   git clone https://github.com/<your-username>/arogya.git
   cd arogya
   ```
2. Environment Variables: Make sure you change the `<username>` & `<password>` according to your local dev needs in `Backend/.env.docker`
   ```init
   PORT=80
   DATABASE_URL=postgres://<username>:<password>@db:5432/arogya_db
   JWT_SECRET_KEY=arogya-secret
   ```
   `Arogya/.env.docker` - used by frontend (Next.js dev mode):
   ```ini
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
3. Run the app using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Access the app:
   - Frontend → http://localhost:3000
   - Backend API → http://localhost:5000

### Stopping & Resetting

To stop the docker app:

```bash
docker-compose down
```

To remove containers + database data:

```bash
docker-compose down --volumes
```
