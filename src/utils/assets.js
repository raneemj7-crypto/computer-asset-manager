export const money = (value) => new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(Number(value) || 0);
export function nextAssetId(assets) {
  const max = assets.reduce((n, asset) => Math.max(n, Number(asset.id?.match(/^AST-(\d+)$/)?.[1] || 0)), 0);
  return `AST-${String(max + 1).padStart(3, '0')}`;
}
export function validateAsset(asset, assets, editingId = null) {
  const errors = {};
  if (!asset.name?.trim()) errors.name = 'Computer name is required.';
  if (!asset.brand?.trim()) errors.brand = 'Brand is required.';
  if (!asset.serial?.trim()) errors.serial = 'Serial number is required.';
  else if (assets.some(a => a.id !== editingId && a.serial.toLowerCase() === asset.serial.trim().toLowerCase())) errors.serial = 'Serial number must be unique.';
  if (!asset.purchaseDate) errors.purchaseDate = 'Purchase date is required.';
  if (asset.cost === '' || !Number.isFinite(Number(asset.cost)) || Number(asset.cost) < 0) errors.cost = 'Enter a valid, non-negative cost.';
  if (asset.status === 'In Use' && !asset.assignedTo?.trim()) errors.assignedTo = 'Assign an employee when status is In Use.';
  return errors;
}
export function filterAssets(assets, { search = '', status = 'All statuses', category = 'All types' } = {}) {
  const term = search.toLowerCase().trim();
  return assets.filter(a => (status === 'All statuses' || a.status === status) && (category === 'All types' || a.category === category) && [a.id, a.name, a.brand, a.serial, a.assignedTo, a.department].some(v => String(v).toLowerCase().includes(term)));
}
