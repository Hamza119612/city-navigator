# City Navigator 🌆

## Overview

City Navigator is a full-stack application for exploring cities worldwide, built with NestJS and React.

## Features

### Backend

- ✅ REST API with pagination and sorting
- ✅ Search functionality (by name, country)
- ✅ PostgreSQL database with TypeORM
- ✅ Unit & Integration tests
- ✅ Docker setup

### Frontend

- ✅ Responsive city listing with sorting
- ✅ Search functionality
- ✅ Pagination
- ✅ React Query for data management
- ✅ Unit tests with Vitest

## Quick Start

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- Yarn/npm

### Development Setup

1. **Clone & Install**

```bash
git clone https://github.com/Hamza119612/city-navigator.git
cd city-navigator
```

2. **Environment Setup**

```bash
# Root directory
cp .env.example .env

# Backend
cd backend
cp .env.example .env
```

3. **Start Services**

```bash
# Start database
docker-compose up -d

cd backend
yarn install
yarn start:dev

cd frontend
yarn install
yarn dev
```

Visit `http://localhost:5173` in your browser.

## Testing

```bash
# Backend tests
cd backend
yarn test
yarn test:e2e
yarn test:coverage

# Frontend tests
cd frontend
yarn test:watch
yarn test:coverage
```

## Project Structure

```
city-navigator/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   ├── database/      # Database configuration
│   │   └── main.ts        # Application entry
│   └── test/              # Test files
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── tests/            # Test files
└── docker-compose.yml    # Docker configuration
```

## License

[MIT License](LICENSE)

## Contact
