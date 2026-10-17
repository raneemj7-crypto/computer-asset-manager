# SE411 Project Part 1 — Architecture and Design Documentation

## 1. Project overview
**Project:** Assetly, Computer Asset Management System  
**Course:** SE411, Fall 2026–2027  
**Scope:** Frontend only, React.js, one asset kind (computers).

**Goal:** Help a company's administrative or IT team maintain a simple, searchable list of computers, including the department, assigned employee, purchase cost, and status.

## 2. Functional requirements
| ID | Requirement | Implementation |
|---|---|---|
| FR-01 | Navigate between app features | Sidebar pages: Overview, Computers, About the team |
| FR-02 | Display computers | Inventory table and recent inventory table |
| FR-03 | Add a computer | Validated Add computer modal |
| FR-04 | Update a computer | Edit button opens pre-filled modal |
| FR-05 | Delete a computer | Delete button with confirmation |
| FR-06 | Search and filter | Full-text search, status filter, type filter |
| FR-07 | Team details | About page listing four team members and student IDs |
| FR-08 | Visual summary | Dashboard metrics and status distribution |
| FR-09 | Export records | CSV export of filtered table |

## 3. Nonfunctional requirements
- **Usability:** clear menu, readable tables, simple forms, feedback after operations.
- **Responsiveness:** desktop and mobile layouts.
- **Correctness:** required-field, negative-cost, duplicate-serial, and employee-assignment checks.
- **Maintainability:** separate data, validation utilities, modal component and application screen.
- **Accessibility:** labeled form fields, button labels, accessible dialog and status messages.

## 4. Architecture
Single-page React application with **unidirectional data flow**:

```text
index.html
  └─ src/main.jsx (React root)
       └─ src/App.jsx (navigation, in-memory asset state, CRUD actions)
            ├─ src/components/AssetModal.jsx (add/edit form and validation UI)
            ├─ src/data/assets.js (array of eight computer objects + options)
            ├─ src/utils/assets.js (ID generation, validation, filtering, currency)
            └─ src/styles.css (responsive visual design)
```

State is held using React `useState` and filtered records are computed using `useMemo`. The array is initialized from `initialAssets`, an exported JavaScript array of objects. Add creates a new object, edit replaces the matching object, and delete filters it out. This is **frontend-only**; no persistence is provided.

## 5. Technology stack
| Technology | Purpose |
|---|---|
| React | UI and state management |
| JavaScript / JSX | Application logic and component markup |
| Vite 8.3.4 | Development server and production bundler |
| CSS3 | Visual design and responsive styling |
| Lucide React | Interface icons |
| Vitest 5.0.4 | Unit/integration test runner |
| React Testing Library + user-event | Test user behavior and DOM responses |
| Git / GitHub | Version control and public submission |

## 6. Data model
Every object has `id`, `name`, `brand`, `category`, `serial`, `assignedTo`, `department`, `purchaseDate`, `cost`, and `status`. IDs use `AST-001` style values and are created based on the maximum existing ID. `serial` must be unique (case-insensitive). `cost` is represented in Saudi riyals (SAR). Status is one of Available, In Use, Maintenance, and Retired.

Example:
```js
{
  id: 'AST-001', name: 'MacBook Pro 14"', brand: 'Apple',
  category: 'Laptop', serial: 'MBP-2024-0451',
  assignedTo: 'Sarah Ahmed', department: 'Design',
  purchaseDate: '2025-03-12', cost: 8999, status: 'In Use'
}
```

## 7. UX and visual design
A light admin-dashboard layout uses a fixed left navigation bar, calm violet/blue accents, neutral cards, a simple data table, and colored status chips. The Overview page summarizes activity; the Computers page handles inventory work; the About page provides team attribution. A mobile navigation toggle supports narrow displays.

## 8. Test plan
| Test | Expected outcome |
|---|---|
| Generate ID after eight seeded objects | `AST-009` |
| Search `macbook` | One matching computer |
| Filter Available | Two computers |
| Reject blank required fields | Validation errors |
| Reject negative cost | Validation error |
| Reject duplicate serial ignoring case | Validation error |
| Edit existing asset using unchanged serial | No duplicate error |
| In Use with no assignee | Validation error |
| Navigate to About | About heading appears |
| Add, edit, delete computer | Table reflects each operation |

Run tests using `npm test` and compile using `npm run build`.

## 9. Team members
| Name | Student ID |
|---|---|
| Layan Mohammed Algublan | 221410621 |
| Raneem Jehad Mahmoud Abumoustafa | 222410457 |
| Hatoon Abdullah | 222410226 |
| Nora Basim Saleh Alomair | 222410172 |

## 10. Verification results (October 15, 2026)
- `npm test`: **9 tests passed across 2 test files** (6 asset utility tests and 3 React workflow tests).
- `npm run build`: **passed**, producing the production files in `dist/`.
- `npm audit`: **0 vulnerabilities** after the dependency upgrade (last reported audit).

## 11. Part 2 extension
A later manually built backend can expose REST endpoints for listing, creating, editing, and deleting computers. The React state actions can then call those endpoints and synchronize with a database. **No such backend is part of this submission.**

## 12. Before submitting
- Confirm the four team names and student IDs appear correctly on the About page.
- Verify `npm test` and `npm run build` succeed.
- Push all source code and documentation to a **public** GitHub repository.
- Submit the repository URL by October 17, 2026 (one student submits).
