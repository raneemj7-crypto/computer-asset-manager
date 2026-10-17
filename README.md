# Assetly — Computer Asset Management System

SE411 · Fall 2026–2027 · Part 1

A responsive React frontend for managing **one kind of company asset: computers**. Assets are stored in an **in-memory JavaScript object collection**, with no backend or database, as required for Part 1.

## Features
- Dashboard with total, assigned, available, and maintenance counts; status distribution; total purchase cost.
- Add computers with validated required fields and unique serial numbers.
- Edit computers, delete with confirmation, and view inventory in a table.
- Search by ID, computer name, brand, serial number, assignee, or department.
- Filter by status and computer type; export currently filtered records as CSV.
- Navigation menu for Overview, Computers, and About the team.
- About page displaying four team members and their student IDs.
- Responsive layout for desktop and mobile.

## Run locally
Requirements: A Node.js version supported by your installed Vite and Vitest versions, plus npm. The application was tested on Node.js 24.10.0; newer dependencies may require a newer Node version.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically http://localhost:5173).

## Run tests and build
```bash
npm test
npm run build
```

## Important Part 1 limitation
Changes are stored in React state while the application is open. **Refreshing the page resets the collection to the eight seed objects.** No database, server, browser storage, or authentication is used. A manually developed backend can be introduced in Part 2.

## Team members
| Name | Student ID |
|---|---|
| Layan Mohammed Algublan | 221410621 |
| Raneem Jehad Mahmoud Abumoustafa | 222410457 |
| Hatoon Abdullah | 222410226 |
| Nora Basim Saleh Alomair | 222410172 |

## Verified results (October 15, 2026)
- `npm test`: **9/9 passed** across 2 test files (Vitest 5.0.4).
- `npm run build`: **successful** (Vite 8.3.4).
- `npm audit`: **0 vulnerabilities** at the most recent check.

## Architecture and stack
See [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for requirements, architecture, technologies, tests, and design.

## Publish to GitHub
1. Create a new **public** GitHub repository (for example `se411-computer-asset-manager`).
2. Inside this project folder run:
```bash
git init
git add .
git commit -m "Build SE411 Part 1 computer asset manager"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/se411-computer-asset-manager.git
git push -u origin main
```
3. One team member submits the resulting public repository URL by **October 17, 2026**.

Replace `YOUR_USERNAME` with your GitHub username.
