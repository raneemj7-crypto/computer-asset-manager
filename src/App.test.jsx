import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { initialAssets } from './data/assets';

const apiState = vi.hoisted(() => ({ assets: [] }));

vi.mock('./services/computerApi', () => ({
  getComputers: vi.fn(async () => ({ content: apiState.assets.map(asset => ({ ...asset })) })),
  getComputerById: vi.fn(async id => ({ ...apiState.assets.find(asset => asset.id === id) })),
  createComputer: vi.fn(async asset => {
    const id = Math.max(0, ...apiState.assets.map(item => item.id)) + 1;
    apiState.assets.unshift({ ...asset, id });
  }),
  updateComputer: vi.fn(async (id, asset) => {
    apiState.assets = apiState.assets.map(item => item.id === id ? { ...asset, id } : item);
  }),
  deleteComputer: vi.fn(async id => {
    apiState.assets = apiState.assets.filter(item => item.id !== id);
  })
}));

const serverAssets = initialAssets.map((asset, index) => ({ ...asset, id: index + 1 }));

describe('Assetly Spring Boot integration UI', () => {
  beforeEach(() => { apiState.assets = serverAssets.map(asset => ({ ...asset })); });

  it('loads computers returned by the server', async () => {
    render(<App/>);
    expect(await screen.findByText('MacBook Pro 14"')).toBeInTheDocument();
    expect(screen.getAllByText('8').length).toBeGreaterThan(0);
  });

  it('searches by the displayed asset ID', async () => {
    const user = userEvent.setup();
    render(<App/>);
    await user.click(await screen.findByRole('button', { name: /Computers\s*8/ }));
    await user.type(screen.getByRole('textbox', { name: 'Search computers' }), 'AST-003');
    expect(screen.getByText('HP EliteBook 840')).toBeInTheDocument();
    expect(screen.queryByText('Dell OptiPlex 7010')).not.toBeInTheDocument();
  });

  it('shows five records per page', async () => {
    const user = userEvent.setup();
    render(<App/>);
    await user.click(await screen.findByRole('button', { name: /Computers\s*8/ }));
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });

  it('adds a computer through the API service', async () => {
    const user = userEvent.setup();
    render(<App/>);
    await user.click(screen.getByRole('button', { name: 'Add computer' }));
    const dialog = screen.getByRole('dialog');
    await user.type(within(dialog).getByRole('textbox', { name: 'Computer name *' }), 'Test Laptop');
    await user.type(within(dialog).getByRole('textbox', { name: 'Brand *' }), 'Dell');
    await user.type(within(dialog).getByRole('textbox', { name: 'Serial number *' }), 'TEST-100');
    await user.type(within(dialog).getByRole('spinbutton', { name: 'Purchase cost (SAR) *' }), '2500');
    await user.click(within(dialog).getByRole('button', { name: 'Add computer' }));
    await waitFor(() => expect(screen.getByText('Test Laptop')).toBeInTheDocument());
  });
});
