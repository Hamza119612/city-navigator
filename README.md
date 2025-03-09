# City Navigator

## 📌 Project Overview

City Navigator is a web application that allows users to browse, search, and view details about cities worldwide. The app provides an interactive and user-friendly experience with a structured backend and a sleek frontend.

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/city-navigator.git
cd city-navigator
```

## 🛠 Set Up Environment Variables

### Create a `.env` file in the root directory:

```ini
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=city_navigator
DB_HOST=database
DB_PORT=5432
```

### Create a `.env` file inside the `backend/` folder:

```ini
PORT=3000
DB_HOST=database
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=city_navigator
```

## 🚀 Start Database

Run the following command to start the backend and database:

```bash
docker-compose up --build -d
```

This will start:

- PostgreSQL database (port `5432`)

## 🎨 Start the Frontend

Navigate to the `backend/` directory and install dependencies:

```bash
cd backend
yarn install
```

Run the backend:

```bash
yarn start:dev
```

## 🎨 Start the Frontend

Navigate to the `frontend/` directory and install dependencies:

```bash
cd frontend
yarn install
```

Run the frontend:

```bash
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or another Vite dev server port).

---

## 🚀 Backend Features (NestJS + PostgreSQL)

- REST API for cities (`GET`, `SEARCH`)
- Pagination & Sorting for large datasets
- Search Functionality (by name, country)
- TypeORM for database interaction
- Logging & Error Handling
- Unit & Integration Testing with Jest
- Dockerized Setup for easy deployment

## 🎨 Frontend Features (React + Vite )

- Table-based City Listing with expandable details
- Search (by name, country)
- Expandable Rows to show additional city details
- Pagination for smooth navigation
- API Integration with the backend

## 🛠️ Tools & Frameworks

### Backend (NestJS)

- **NestJS** (TypeScript-based backend framework)
- **TypeORM** (ORM for PostgreSQL)
- **Jest** (Testing framework)
- **Docker Compose** (Containerized setup)
- **PostgreSQL** (Relational database)

### Frontend (React + Vite)

- **React (Vite)** (Fast frontend development framework)
- **Axios / Fetch API** (To interact with the backend)
- **React Query** (For data fetching & caching)

---

---

## 🏗️ Future Improvements

- Favorites & Bookmarking Cities
- Interactive Map with City Locations

---

## 📜 License

This project is open-source and available under the **MIT License**.
