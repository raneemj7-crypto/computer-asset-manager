# Part 2 implementation notes

## Backend architecture

The React application sends HTTP requests to `ComputerAssetController`. The controller calls `ComputerAssetService`, which uses `ComputerAssetRepository`. Spring Data JDBC stores the records in the H2 `computer_asset` table.

## Required functions

- Add a computer through `POST /api/v1/computers`.
- Search by ID through `GET /api/v1/computers/{id}`. The React edit button uses this route before opening the form.
- Retrieve a page through `GET /api/v1/computers?page={page}&size={size}`.
- Update a computer through `PUT /api/v1/computers/{id}`.
- Delete remains available because it existed in Part 1 and appears in Lab 14.
- Backend tests use JUnit 5, Mockito, and MockMvc.

The frontend requests up to 100 database records, then displays five records per page. This keeps the React code easy to explain while the backend still provides the required paginated endpoint.
