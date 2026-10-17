import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { categories, departments, statuses } from '../data/assets';
import { validateAsset } from '../utils/assets';
const blank = { name: '', brand: '', category: 'Laptop', serial: '', assignedTo: '', department: 'IT', purchaseDate: new Date().toISOString().slice(0, 10), cost: '', status: 'Available' };
export default function AssetModal({ asset, assets, onClose, onSave }) {
  const [form, setForm] = useState(asset ? { ...asset } : { ...blank });
  const [errors, setErrors] = useState({});
  useEffect(() => { const handler = e => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, [onClose]);
  const change = (key, value) => { setForm(prev => ({ ...prev, [key]: value })); setErrors(prev => ({ ...prev, [key]: undefined })); };
  const submit = e => {
    e.preventDefault();
    const validation = validateAsset(form, assets, asset?.id);
    if (Object.keys(validation).length) { setErrors(validation); return; }
    onSave({ ...form, name: form.name.trim(), brand: form.brand.trim(), serial: form.serial.trim(), assignedTo: form.assignedTo.trim(), cost: Number(form.cost) });
  };
  const field = (key, label, placeholder, type = 'text') => <label className="field" key={key}><span>{label}</span><input aria-label={label} type={type} value={form[key]} placeholder={placeholder} onChange={e => change(key, e.target.value)} min={type === 'number' ? '0' : undefined} step={type === 'number' ? '0.01' : undefined}/>{errors[key] && <small className="field-error" role="alert">{errors[key]}</small>}</label>;
  const select = (key, label, options) => <label className="field" key={key}><span>{label}</span><select aria-label={label} value={form[key]} onChange={e => change(key, e.target.value)}>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><div className="modal" role="dialog" aria-modal="true" aria-label={asset ? 'Edit computer' : 'Add computer'}><div className="modal-head"><div><p className="eyebrow">ASSET DETAILS</p><h2>{asset ? 'Edit computer' : 'Add new computer'}</h2><p>Keep your inventory accurate and up to date.</p></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20}/></button></div><form onSubmit={submit} noValidate><div className="form-grid">{field('name', 'Computer name *', 'e.g. MacBook Pro 14')}{field('brand', 'Brand *', 'e.g. Apple')}{select('category', 'Computer type', categories)}{field('serial', 'Serial number *', 'e.g. MBP-2026-0042')}{select('status', 'Status', statuses)}{select('department', 'Department', departments)}{field('assignedTo', 'Assigned to' + (form.status === 'In Use' ? ' *' : ''), 'Employee name (optional)')}{field('purchaseDate', 'Purchase date *', '', 'date')}{field('cost', 'Purchase cost (SAR) *', '0', 'number')}</div><div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary">{asset ? 'Save changes' : 'Add computer'}</button></div></form></div></div>;
}
