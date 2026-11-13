# Computer Asset Manager — Requirements Specification

## 1. Project Overview

**Project Name:** Computer Asset Manager (Assetly)  
**Course:** SE411  
**Project Part:** Part 1 — React Frontend

Computer Asset Manager is a React-based frontend application designed to help an organization manage its computer assets. It provides an interface for viewing computer inventory, adding new computers, updating existing records, deleting records, searching and filtering the inventory, and viewing summary statistics.

For Part 1, asset records are maintained in an in-memory collection using React state. No database or backend server is required.

## 2. Project Objectives

The objectives are to:

- Develop a React application for managing one type of asset: computers.
- Implement create, read, update, and delete (CRUD) operations.
- Provide a navigation menu for accessing the application's features.
- Display inventory information and summary statistics.
- Validate user input to maintain consistent asset records.
- Provide an About page containing team members' names and student IDs.
- Document the application architecture, technology stack, and features.
- Generate and execute automated tests for the application.

## 3. Scope

### 3.1 In Scope

- Displaying computer inventory records.
- Adding new computer records.
- Viewing and editing existing records.
- Deleting computer records with confirmation.
- Searching and filtering the inventory.
- Displaying inventory summary statistics.
- Validating required fields and selected business rules.
- Exporting the filtered inventory to CSV.
- Displaying team information on the About page.
- Using in-memory data storage.
- Testing and documenting the React application.

### 3.2 Out of Scope

- Database persistence.
- Backend development and REST API integration.
- User authentication and authorization.
- Server-side data storage.
- Multi-user synchronization.

These features are outside the scope of Part 1.

## 4. Asset Data Requirements

The application manages computer assets. Each computer record contains the following fields:

| Field | Description |
|---|---|
| ID | Unique identifier for the computer record. |
| Name | Name or descriptive label of the computer. |
| Brand | Manufacturer or brand of the computer. |
| Category | Computer category or type. |
| Serial Number | Serial number used to identify the physical computer. |
| Assigned To | Employee assigned to the computer, when applicable. |
| Department | Department associated with the computer. |
| Purchase Date | Date the computer was purchased. |
| Cost | Purchase cost of the computer. |
| Status | Current state of the computer, such as In Use or Available. |

The ID is used to identify records during update and deletion operations. The remaining fields describe the computer asset.

## 5. Functional Requirements

### FR-01: Display Computer Inventory

The system shall display computer records in an organized inventory interface.

### FR-02: Add a Computer

The system shall allow users to enter computer information and add a new computer record to the inventory.

### FR-03: View Computer Information

The system shall allow users to inspect the computer records displayed in the inventory.

### FR-04: Update a Computer

The system shall allow users to edit an existing computer record and reflect the changes in the inventory.

### FR-05: Delete a Computer

The system shall allow users to delete a computer record after confirming the deletion.

### FR-06: Navigate Between Features

The system shall provide a navigation menu that allows users to access the application's available pages and features.

### FR-07: Search Computer Inventory

The system shall allow users to search computer records using the supported search fields.

### FR-08: Filter Computer Inventory

The system shall allow users to filter computer records using the available filter options.

### FR-09: Display Summary Statistics

The system shall display summary information about the computer inventory on the overview dashboard.

### FR-10: Validate Input

The system shall validate computer information before saving a new record or updating an existing record.

### FR-11: Display Team Information

The system shall provide an About page containing each team member's name and student ID. A menu item shall provide access to this page.

### FR-12: Maintain In-Memory Data

The system shall store and manage computer records in an in-memory collection for Part 1. Database persistence is not required.

### FR-13: Export Inventory Data

The system shall allow users to export the currently filtered computer records as a CSV file.

## 6. Input Validation Requirements

The application shall apply the following validation rules where applicable:

- Required fields must be completed before a computer record is saved.
- The cost must not be negative.
- Serial numbers must be unique across computer records, ignoring differences in letter casing.
- A computer marked as In Use must have an assigned employee.
- An existing computer must retain its identity when edited.
- A cancelled deletion must leave the computer record unchanged.

The application should provide clear feedback when input is invalid.

## 7. User Stories

### US-01: View Inventory

As an inventory manager, I want to view all computer records so that I can monitor the organization's computer assets.

### US-02: Add a Computer

As an inventory manager, I want to add a computer with its relevant details so that newly acquired assets can be recorded.

### US-03: Update a Computer

As an inventory manager, I want to edit a computer's information so that the inventory remains accurate when asset details change.

### US-04: Delete a Computer

As an inventory manager, I want to delete a computer record after confirmation so that obsolete or incorrectly recorded assets can be removed.

### US-05: Search Inventory

As an inventory manager, I want to search for a computer so that I can locate a particular asset efficiently.

### US-06: Filter Inventory

As an inventory manager, I want to filter computer records so that I can focus on computers matching selected criteria.

### US-07: Review Summary Statistics

As an inventory manager, I want to view inventory statistics so that I can understand the overall status of the computer inventory.

### US-08: View Team Information

As a user, I want to open the About page so that I can identify the project team members.

## 8. Page Outline

### 8.1 Overview Page

Displays summary statistics and an overview of the computer inventory.

### 8.2 Computers Page

Displays computer records and provides the available inventory management features, including searching, filtering, adding, editing, and deleting records.

### 8.3 Add/Edit Computer Form

Provides input fields for creating a computer record or editing an existing record. The form validates input before saving.

### 8.4 About Page

Displays the project team members' names and student IDs.

### 8.5 Navigation Menu

Provides access to the available application pages and features.

## 9. Non-Functional Requirements

### NFR-01: Usability

The interface should present information clearly and make the main inventory operations easy to access.

### NFR-02: Data Consistency

The application should validate input and maintain consistent computer records during CRUD operations.

### NFR-03: Maintainability

The source code should be organized into understandable components, utility functions, and supporting files.

### NFR-04: Testability

The application should include automated tests for important utility functions and user workflows.

### NFR-05: Responsiveness

The interface should remain usable across supported desktop and smaller screen sizes.

## 10. Technology Stack

- **React:** Builds the user interface and reusable components.
- **Vite:** Provides the development server and production build tooling.
- **JavaScript:** Implements application behavior and data handling.
- **CSS:** Styles the application interface.
- **Vitest:** Runs automated tests.
- **React Testing Library:** Tests user-facing application behavior.

The application uses React state and an in-memory collection for Part 1. No database is used.

## 11. Acceptance Criteria

Part 1 is considered functionally acceptable when:

1. The application runs as a React application.
2. Users can navigate between the available pages.
3. Computer records can be added and displayed.
4. Existing computer records can be updated.
5. Computer records can be deleted with confirmation.
6. Input validation prevents the invalid cases specified in this document.
7. The About page displays all team members' names and student IDs.
8. The inventory data is maintained in memory rather than a database.
9. Automated tests execute successfully.
10. The application can be built successfully for production.

## 12. Project Limitations

Because Part 1 uses in-memory storage, computer records are not permanently saved. Reloading the application may restore the initial sample records. Database persistence and backend integration are reserved for the subsequent project part.

## 13. Team Information

- Team Member 1: Raneem Abumoustafa — 222410457
- Team Member 2: Hatoon Abdullah — 222410226
- Team Member 3: Nora Alomair — 222410172
- Team Member 4: Layan Algublan — 221410621

## 14. AI Tools Used

ChatGPT and Claude were used to assist in specifying project requirements, planning the visual design, developing the React frontend, generating project documentation, and creating automated tests, in accordance with the SE411 Part 1 requirements.