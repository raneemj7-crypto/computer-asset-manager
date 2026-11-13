import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowDownToLine, ArrowRight, Boxes, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Cpu, LayoutDashboard, Laptop, Menu, Monitor, MoreHorizontal, Pencil, Plus, Search, ShieldCheck, Trash2, TrendingUp, Wrench, X } from 'lucide-react';
import { statuses, categories } from './data/assets';
import { assetId, filterAssets, money } from './utils/assets';
import { createComputer, deleteComputer, getComputerById, getComputers, updateComputer } from './services/computerApi';
import AssetModal from './components/AssetModal';
import './styles.css';
import './phase2.css';

const team = [
  { name: 'Layan Mohammed Algublan', id: '221410621' },
  { name: 'Raneem Jehad Mahmoud Abumoustafa', id: '222410457' },
  { name: 'Hatoon Abdullah', id: '222410226' },
  { name: 'Nora Basim Saleh Alomair', id: '222410172' }
];

export default function App() {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [category, setCategory] = useState('All types');
  const [pageNumber, setPageNumber] = useState(0);
  const [modalAsset, setModalAsset] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');

  const filtered = useMemo(() => filterAssets(assets, { search, status, category }), [assets, search, status, category]);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  const inUse = assets.filter(asset => asset.status === 'In Use').length;
  const available = assets.filter(asset => asset.status === 'Available').length;
  const maintenance = assets.filter(asset => asset.status === 'Maintenance').length;

  const loadComputers = async () => {
    try {
      setServerError('');
      const result = await getComputers(0, 100);
      setAssets(result.content);
    } catch (error) {
      setServerError('Cannot connect to the Spring Boot server. Start the backend on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadComputers(); }, []);
  useEffect(() => { setPageNumber(0); }, [search, status, category]);

  const navigate = next => {
    setPage(next);
    setMobileOpen(false);
    setSearch('');
    setStatus('All statuses');
    setCategory('All types');
    setPageNumber(0);
  };

  const save = async asset => {
    try {
      if (asset.id) {
        await updateComputer(asset.id, asset);
        setToast(`${asset.name} updated successfully.`);
      } else {
        await createComputer(asset);
        setToast(`${asset.name} added successfully.`);
      }
      await loadComputers();
      setModalAsset(undefined);
    } catch (error) {
      setServerError(error.message);
    }
  };

  const edit = async id => {
    try { setModalAsset(await getComputerById(id)); }
    catch (error) { setServerError(error.message); }
  };

  const remove = async () => {
    if (!deleteTarget) return;
    try {
      await deleteComputer(deleteTarget.id);
      setToast(`${deleteTarget.name} deleted.`);
      setDeleteTarget(null);
      await loadComputers();
    } catch (error) {
      setServerError(error.message);
    }
  };

  const exportCsv = () => {
    const keys = ['id', 'name', 'brand', 'category', 'serial', 'assignedTo', 'department', 'purchaseDate', 'cost', 'status'];
    const csv = [keys.join(','), ...filtered.map(asset => keys.map(key => `"${String(asset[key] ?? '').replaceAll('"', '""')}"`).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'computer-assets.csv';
    link.click();
    URL.revokeObjectURL(url);
    setToast('CSV exported.');
  };

  const metrics = [
    { label: 'Total computers', value: assets.length, icon: Boxes, color: 'blue', note: 'All registered devices' },
    { label: 'In use', value: inUse, icon: CheckCircle2, color: 'green', note: 'Assigned to employees' },
    { label: 'Available', value: available, icon: Laptop, color: 'purple', note: 'Ready to be assigned' },
    { label: 'Maintenance', value: maintenance, icon: Wrench, color: 'orange', note: 'Needs attention' }
  ];

  const table = rows => <div className="table-scroll">
    <table><thead><tr><th>COMPUTER</th><th>ASSET ID</th><th>ASSIGNED TO</th><th>DEPARTMENT</th><th>STATUS</th><th>PURCHASE COST</th><th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{rows.map(asset => <tr key={asset.id}>
        <td><div className="computer-cell"><div className="device-icon">{asset.category === 'Laptop' ? <Laptop size={19}/> : <Monitor size={19}/>}</div><div><strong>{asset.name}</strong><small>{asset.brand} · {asset.category}</small></div></div></td>
        <td className="mono">{assetId(asset.id)}</td><td>{asset.assignedTo || <span className="muted">Unassigned</span>}</td><td>{asset.department}</td><td><span className={`status status-${asset.status.toLowerCase().replace(' ', '-')}`}><i/>{asset.status}</span></td><td className="cost">{money(asset.cost)}</td>
        <td><div className="row-actions"><button className="icon-button small" aria-label={`Edit ${asset.name}`} onClick={() => edit(asset.id)}><Pencil size={16}/></button><button className="icon-button small delete" aria-label={`Delete ${asset.name}`} onClick={() => setDeleteTarget(asset)}><Trash2 size={16}/></button></div></td>
      </tr>)}</tbody></table>
    {rows.length === 0 && !loading && <div className="empty"><Search size={28}/><h3>No computers found</h3><p>Try adjusting the search or filters.</p><button className="button secondary" onClick={() => { setSearch(''); setStatus('All statuses'); setCategory('All types'); }}>Clear filters</button></div>}
  </div>;

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'assets', label: 'Computers', icon: Monitor },
    { id: 'about', label: 'About the team', icon: CircleHelp }
  ];

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="logo"><span className="logo-mark"><Boxes size={23}/></span><span>assetly<span className="logo-dot">.</span></span></div><div className="side-label">WORKSPACE</div>
      <nav aria-label="Main navigation">{navItems.map(item => <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}><item.icon size={19}/>{item.label}{item.id === 'assets' && <span className="nav-count">{assets.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-info"><span className="info-icon"><ShieldCheck size={17}/></span><div><strong>Spring server</strong><p>Connected to the H2 database.</p></div></div><div className="side-profile"><span className="avatar">SE</span><div><strong>SE411 Project</strong><small>Fall 2026–27</small></div><MoreHorizontal size={18}/></div></div>
    </aside>
    {mobileOpen && <div className="mobile-scrim" onClick={() => setMobileOpen(false)}/>}
    <main className="main"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu/></button><span className="breadcrumb">Workspace</span><span className="slash">/</span><strong>{page === 'dashboard' ? 'Overview' : page === 'assets' ? 'Computers' : 'About the team'}</strong></div><div className="topbar-right"><span className="topbar-date">SE411 · Part 2</span><span className="top-avatar">SE</span></div></header>
      <div className="content">{serverError && <div className="server-error" role="alert">{serverError}</div>}
        {page === 'dashboard' && <>
          <div className="page-heading"><div><div className="overline"><span className="live-dot"/>YOUR ASSET WORKSPACE</div><h1>Overview <span className="heading-spark">✳</span></h1><p>Computer data loaded from the Spring Boot server.</p></div><button className="button primary" onClick={() => setModalAsset(null)}><Plus size={18}/> Add computer</button></div>
          <section className="metrics">{metrics.map((metric, index) => <div className="metric" key={metric.label}><div className="metric-top"><span>{metric.label}</span><span className={`metric-icon ${metric.color}`}><metric.icon size={20}/></span></div><div className="metric-value">{metric.value}<span className="metric-suffix">{index === 0 ? 'devices' : 'units'}</span></div><div className="metric-note">{metric.note}</div></div>)}</section>
          <section className="dashboard-grid"><div className="panel summary-panel"><div className="panel-head"><div><h2>Inventory snapshot</h2><p>Distribution by current status</p></div><span className="soft-icon"><Activity size={19}/></span></div><div className="snapshot"><div className="donut" style={{ background: assets.length ? `conic-gradient(#5a69e8 0 ${inUse / assets.length * 100}%, #8e80ef ${inUse / assets.length * 100}% ${(inUse + available) / assets.length * 100}%, #f2b56c ${(inUse + available) / assets.length * 100}% ${(inUse + available + maintenance) / assets.length * 100}%, #cbd0da ${(inUse + available + maintenance) / assets.length * 100}% 100%)` : '#edf0f7' }}><div><strong>{assets.length}</strong><small>Total assets</small></div></div><div className="legend">{statuses.map((item, index) => <div key={item}><span className={`legend-dot l${index}`}/><span>{item}</span><strong>{assets.filter(asset => asset.status === item).length}</strong></div>)}</div></div></div><div className="panel value-panel"><div className="panel-head"><div><h2>Asset value</h2><p>Total investment in computers</p></div><span className="soft-icon"><TrendingUp size={19}/></span></div><div className="total-value">{money(assets.reduce((sum, asset) => sum + Number(asset.cost), 0))}</div><div className="value-caption">Combined purchase cost of all registered devices</div><div className="value-bottom"><span className="value-decoration"><Cpu size={21}/></span><span>The database keeps the inventory available to the React application.</span></div></div></section>
          <section className="panel list-panel"><div className="section-heading"><div><h2>Recent computers</h2><p>The latest records returned by the server</p></div><button className="text-button" onClick={() => navigate('assets')}>View all computers <ArrowRight size={16}/></button></div>{table(assets.slice(0, 5))}</section>
        </>}
        {page === 'assets' && <>
          <div className="page-heading"><div><div className="overline"><span className="live-dot"/>ASSET INVENTORY</div><h1>Computers</h1><p>Search by asset ID or details, then use the page controls below.</p></div><button className="button primary" onClick={() => setModalAsset(null)}><Plus size={18}/> Add computer</button></div>
          <section className="panel inventory-panel"><div className="inventory-toolbar"><div className="search-box"><Search size={18}/><input aria-label="Search computers" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search ID, computer, serial, person..."/></div><div className="filters"><label><span className="sr-only">Filter by status</span><select aria-label="Filter by status" value={status} onChange={event => setStatus(event.target.value)}><option>All statuses</option>{statuses.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label><label><span className="sr-only">Filter by type</span><select aria-label="Filter by type" value={category} onChange={event => setCategory(event.target.value)}><option>All types</option>{categories.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label><button className="button secondary export" onClick={exportCsv}><ArrowDownToLine size={16}/> Export CSV</button></div></div><div className="inventory-title"><h2>All computers <span className="count-pill">{filtered.length}</span></h2><p>Displaying {paginated.length} of {filtered.length} matching assets</p></div>{table(paginated)}<div className="pagination"><button className="button secondary" disabled={pageNumber === 0} onClick={() => setPageNumber(value => value - 1)}>Previous</button><span>Page {pageNumber + 1} of {pageCount}</span><button className="button secondary" disabled={pageNumber + 1 >= pageCount} onClick={() => setPageNumber(value => value + 1)}>Next</button></div></section>
        </>}
        {page === 'about' && <>
          <div className="page-heading"><div><div className="overline"><span className="live-dot"/>THE PEOPLE BEHIND THE PROJECT</div><h1>About the team</h1><p>Meet the team building Assetly for SE411.</p></div></div><section className="about-hero"><div className="about-symbol"><Boxes size={34}/></div><span>SE411 · FALL 2026–2027</span><h2>Computer asset management with React and Spring Boot.</h2><p>Assetly records, updates, searches, and deletes company computer assets through a REST API and an H2 database.</p></section><section className="panel about-panel"><div className="section-heading"><div><h2>Team members</h2><p>The four students behind the Assetly project</p></div></div><div className="team-grid">{team.map((member, index) => <div className="team-member" key={member.id}><div className="member-avatar">{String(index + 1).padStart(2, '0')}</div><div><h3>{member.name}</h3><p>Student ID: {member.id}</p></div></div>)}</div></section><section className="about-foot"><ClipboardList size={19}/><span>Part 2 connects the React frontend to a Spring Boot REST API with an H2 database.</span></section>
        </>}
      </div>
    </main>
    {modalAsset !== undefined && <AssetModal asset={modalAsset} assets={assets} onClose={() => setModalAsset(undefined)} onSave={save}/>}
    {deleteTarget && <div className="modal-backdrop"><div className="confirm-modal" role="alertdialog" aria-modal="true" aria-label="Delete computer"><div className="delete-symbol"><Trash2 size={22}/></div><h2>Delete this computer?</h2><p>You are about to delete <strong>{deleteTarget.name}</strong> ({assetId(deleteTarget.id)}).</p><div className="modal-actions"><button className="button secondary" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="button danger" onClick={remove}>Delete computer</button></div></div></div>}
    {toast && <div className="toast" role="status"><CheckCircle2 size={18}/>{toast}<button aria-label="Dismiss notification" onClick={() => setToast('')}><X size={15}/></button></div>}
  </div>;
}
