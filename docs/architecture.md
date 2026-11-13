# Assetly — Architecture & Technical Documentation

**Course:** SE411 · Fall 2026–2027 · Part 1
**Scope:** React frontend only. Manages one kind of asset: **computers**.
**Related document:** [requirements.md](requirements.md) has the functional requirements, user stories and page outline.

---

## 1. Overview

Assetly is a single-page React application that lets a company's IT or admin team keep a list of its computers. Users can add, view, edit and delete computer records, search and filter the list, see summary statistics, and export the list to CSV.

As Part 1 requires, the data lives in an **in-memory collection of JavaScript objects**. There is no backend, database or browser storage, so refreshing the page restores the 8 sample records.

---

## 2. Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | Builds the user interface and manages state |
| JavaScript (JSX) | — | Application logic and component markup |
| Vite | 8.3.4 | Development server and production build |
| CSS3 | — | Styling and responsive layout (`src/styles.css`) |
| Lucide React | 0.468.0 | Icons |
| Vitest | 5.0.4 | Test runner |
| React Testing Library | 16.3.3 | Tests components the way a user uses them |
| @testing-library/user-event | 14.6.8 | Simulates clicks and typing in tests |
| jsdom | 30.1.2 | Browser-like environment for tests |
| Git / GitHub | — | Version control and public submission |

---

## 3. Project Structure

```text
computer-asset-manager/
├── index.html                  # HTML entry page
├── vite.config.js              # Vite + Vitest configuration
├── package.json                # Scripts and dependencies
├── docs/
│   ├── requirements.md         # Requirements specification
│   └── architecture.md         # This document
└── src/
    ├── main.jsx                # Mounts <App /> into #root
    ├── App.jsx                 # Navigation, pages, asset state, CRUD actions
    ├── styles.css              # All styles + responsive breakpoints
    ├── components/
    │   └── AssetModal.jsx      # Add / Edit form (shared for both modes)
    ├── data/
    │   └── assets.js           # In-memory seed data + dropdown options
    ├── utils/
    │   ├── assets.js           # ID generation, validation, filtering, currency format
    │   └── assets.test.js      # Unit tests for utilities
    ├── App.test.jsx            # User-workflow tests
    └── test/setup.js           # Test setup (jest-dom matchers, cleanup)
```

---

## 4. Architecture

The app follows React's **one-way data flow**: the state lives in `App`, it is passed down to child components as props, and children send changes back up through callback functions.

```text
main.jsx
  └── App  (owns all state)
        ├── Sidebar menu ........ Overview | Computers | About the team
        ├── Overview page ....... metric cards, status chart, total value, recent table
        ├── Computers page ...... search, filters, CSV export, inventory table
        ├── About page .......... team members and student IDs
        ├── AssetModal .......... add / edit form   ──onSave(asset)──▶ App
        └── Delete dialog ....... confirm / cancel  ──remove()──────▶ App

App ──uses──▶ data/assets.js   (initialAssets, statuses, categories, departments)
App ──uses──▶ utils/assets.js  (nextAssetId, filterAssets, money)
AssetModal ──uses──▶ utils/assets.js (validateAsset)
```

### 4.1 Navigation

The menu is a sidebar of buttons. A `page` state value (`'dashboard'`, `'assets'` or `'about'`) decides which page is rendered. On small screens the sidebar is hidden and opened with a menu button in the top bar.

### 4.2 State management

All state is held in `App` with React's `useState` hook:

| State | Purpose |
|---|---|
| `assets` | The in-memory array of computer objects (starts as a copy of `initialAssets`) |
| `page` | The page currently shown |
| `search`, `status`, `category` | Search text and filter values on the Computers page |
| `modalAsset` | `undefined` = form closed, `null` = add mode, an object = edit mode |
| `deleteTarget` | The computer waiting for delete confirmation |
| `mobileOpen` | Whether the mobile menu is open |
| `toast` | Success message shown after an action |

The filtered list is computed with `useMemo` so it only recalculates when the assets, search text or filters change.

### 4.3 CRUD operations

| Operation | Where | How it works |
|---|---|---|
| **Create** | `save()` in `App.jsx` | Gives the new object an ID from `nextAssetId()` (e.g. `AST-009`) and adds it to the start of the array |
| **Read** | Overview + Computers pages | Shows the array in a table; the Overview shows the 5 most recent |
| **Update** | `save()` in `App.jsx` | Replaces the object with the same `id` using `map()` |
| **Delete** | `remove()` in `App.jsx` | Runs after the user confirms; removes the object using `filter()` |

State is always updated immutably (a new array is created instead of changing the old one), so React re-renders correctly.

### 4.4 Validation

`validateAsset()` in `src/utils/assets.js` checks the form before saving:

- Name, brand, serial number, purchase date and cost are required.
- Cost must be a valid number and not negative.
- Serial numbers must be unique (case is ignored). When editing, a computer may keep its own serial.
- A computer with status **In Use** must have an assigned employee.

Errors are shown under each field, and the form does not close until they are fixed.

---

## 5. Data Model

Each computer is a JavaScript object:

| Field | Type | Example | Rules |
|---|---|---|---|
| `id` | string | `AST-001` | Generated automatically, unique |
| `name` | string | `MacBook Pro 14"` | Required |
| `brand` | string | `Apple` | Required |
| `category` | string | `Laptop` | Laptop, Desktop, Workstation, Mini PC, All-in-One |
| `serial` | string | `MBP-2024-0451` | Required, unique |
| `assignedTo` | string | `Sarah Ahmed` | Required only when status is In Use |
| `department` | string | `Design` | IT, Design, Finance, Marketing, Operations, HR, Sales, Other |
| `purchaseDate` | string (YYYY-MM-DD) | `2025-03-12` | Required |
| `cost` | number (SAR) | `8999` | Required, ≥ 0 |
| `status` | string | `In Use` | Available, In Use, Maintenance, Retired |

---

## 6. Features

1. **Navigation menu:** Overview, Computers, About the team.
2. **Overview dashboard:** counts of total, in-use, available and maintenance computers; a status chart; total purchase value; recent computers.
3. **Inventory table:** every computer with ID, assignee, department, status and cost.
4. **Add a computer:** a validated form in a dialog.
5. **Edit a computer:** the same form, pre-filled.
6. **Delete a computer:** a confirmation dialog first; Cancel keeps the record.
7. **Search:** by ID, name, brand, serial, assignee or department.
8. **Filters:** by status and by computer type.
9. **CSV export:** downloads the currently filtered list.
10. **About page:** team members' names and student IDs.
11. **Responsive design:** works on desktop and phone screens.
12. **Feedback messages:** a notification after each add, edit, delete or export.

---

## 7. Testing

Tests use **Vitest** and **React Testing Library**. Run them with `npm test`.

| # | Test | File | Expected result |
|---|---|---|---|
| 1 | Generate next ID | `assets.test.js` | `AST-009` after 8 seeds; `AST-001` for an empty list |
| 2 | Search and filter | `assets.test.js` | "macbook" → 1; Available → 2; Desktop → 4 |
| 3 | Empty fields / negative cost | `assets.test.js` | Validation errors returned |
| 4 | Duplicate serial (any case) | `assets.test.js` | Validation error |
| 5 | Edit keeps own serial | `assets.test.js` | No error |
| 6 | In Use without assignee | `assets.test.js` | Validation error |
| 7 | Navigate to About | `App.test.jsx` | About heading appears |
| 8 | Search in the UI | `App.test.jsx` | "Displaying 1 of 8" |
| 9 | Add → edit → delete | `App.test.jsx` | Table updates after each step |
| 10 | Submit empty form | `App.test.jsx` | Errors shown, dialog stays open |
| 11 | Cancel delete | `App.test.jsx` | Computer is still in the table |

**Result:** 11/11 tests pass across 2 test files. `npm run build` succeeds.

---

## 8.  AI Tools Used

ChatGPT and Claude were used to assist in specifying project requirements, planning the visual design, developing the React frontend, generating project documentation, and creating automated tests, in accordance with the SE411 Part 1 requirements.

---

## 9. Limitations and Part 2

- Data is kept in memory only, so refreshing the page resets it to the 8 sample records.
- There is no login, backend or database in Part 1.
- In Part 2, a hand-written Spring Boot backend will provide REST endpoints. The CRUD functions in `App.jsx` will then call the API instead of changing the local array.
