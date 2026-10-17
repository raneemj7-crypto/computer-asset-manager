// Part 1: sample data is an in-memory collection of JavaScript objects (no database).
export const initialAssets = [
  { id: 'AST-001', name: 'MacBook Pro 14"', brand: 'Apple', category: 'Laptop', serial: 'MBP-2024-0451', assignedTo: 'Sarah Ahmed', department: 'Design', purchaseDate: '2025-03-12', cost: 8999, status: 'In Use' },
  { id: 'AST-002', name: 'Dell OptiPlex 7010', brand: 'Dell', category: 'Desktop', serial: 'DEL-7010-0234', assignedTo: 'Mohammed Ali', department: 'Finance', purchaseDate: '2025-05-20', cost: 4250, status: 'In Use' },
  { id: 'AST-003', name: 'HP EliteBook 840', brand: 'HP', category: 'Laptop', serial: 'HP-840-0087', assignedTo: '', department: 'IT', purchaseDate: '2026-01-08', cost: 5700, status: 'Available' },
  { id: 'AST-004', name: 'Lenovo ThinkPad X1', brand: 'Lenovo', category: 'Laptop', serial: 'LEN-X1-0182', assignedTo: 'Reem Hassan', department: 'Marketing', purchaseDate: '2025-08-16', cost: 7800, status: 'In Use' },
  { id: 'AST-005', name: 'iMac 24"', brand: 'Apple', category: 'Desktop', serial: 'IMC-24-0065', assignedTo: '', department: 'Design', purchaseDate: '2024-11-11', cost: 6499, status: 'Maintenance' },
  { id: 'AST-006', name: 'Dell Latitude 5440', brand: 'Dell', category: 'Laptop', serial: 'DL-5440-0289', assignedTo: '', department: 'Operations', purchaseDate: '2026-02-14', cost: 4990, status: 'Available' },
  { id: 'AST-007', name: 'HP ProDesk 400', brand: 'HP', category: 'Desktop', serial: 'HP-400-0103', assignedTo: 'Omar Khalid', department: 'HR', purchaseDate: '2024-09-28', cost: 3200, status: 'In Use' },
  { id: 'AST-008', name: 'Lenovo ThinkCentre M70', brand: 'Lenovo', category: 'Desktop', serial: 'LEN-M70-0271', assignedTo: '', department: 'IT', purchaseDate: '2025-12-04', cost: 3850, status: 'Retired' }
];
export const statuses = ['Available', 'In Use', 'Maintenance', 'Retired'];
export const categories = ['Laptop', 'Desktop', 'Workstation', 'Mini PC', 'All-in-One'];
export const departments = ['IT', 'Design', 'Finance', 'Marketing', 'Operations', 'HR', 'Sales', 'Other'];
