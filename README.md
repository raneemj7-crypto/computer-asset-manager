# Assetly - Computer Asset Manager Part 2

SE411 Fall 2026-2027

This version connects the original React frontend to a simple Spring Boot REST server. The backend follows the same package style used in Labs 14 and 15: model, repository, service, controller, H2 SQL files, and JUnit/Mockito tests.

## Project folders

```text
computer-asset-manager-phase2/
|- backend/       Spring Boot server and H2 database
|- src/           React frontend
|- docs/          Project documentation
|- package.json   Frontend dependencies and scripts
```

## 1. Run the backend

Java 17 is recommended, matching the course setup.

```bash
cd backend
./mvnw spring-boot:run
```

The server runs at `http://localhost:8080`. H2 seed data is loaded from `backend/src/main/resources/data.sql` whenever the server starts.

## 2. Run the frontend

Open a second terminal in the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run all tests

Backend tests:

```bash
cd backend
./mvnw test
```

Frontend tests:

```bash
npm test
```

Verified before delivery: 12 backend tests passed, 10 frontend tests passed, and the Vite production build completed successfully.

## REST API

| Operation | Method | Route | Success response |
|---|---|---|---|
| Add a computer | POST | `/api/v1/computers` | 201 Created |
| Get paginated computers | GET | `/api/v1/computers?page=0&size=5` | 200 OK |
| Find a computer by ID | GET | `/api/v1/computers/{id}` | 200 OK |
| Update a computer | PUT | `/api/v1/computers/{id}` | 204 No Content |
| Delete a computer | DELETE | `/api/v1/computers/{id}` | 204 No Content |

## Team

| Student | ID |
|---|---|
| Layan Mohammed Algublan | 221410621 |
| Raneem Jehad Mahmoud Abumoustafa | 222410457 |
| Hatoon Abdullah | 222410226 |
| Nora Basim Saleh Alomair | 222410172 |
