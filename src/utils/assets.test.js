import { describe, it, expect } from 'vitest';
import { filterAssets, nextAssetId, validateAsset } from './assets';
import { initialAssets } from '../data/assets';
describe('asset utilities', () => {
  it('generates the next unique asset ID', () => { expect(nextAssetId(initialAssets)).toBe('AST-009'); expect(nextAssetId([])).toBe('AST-001'); });
  it('filters by search, status and category', () => { expect(filterAssets(initialAssets,{search:'macbook'})).toHaveLength(1); expect(filterAssets(initialAssets,{status:'Available'})).toHaveLength(2); expect(filterAssets(initialAssets,{category:'Desktop'})).toHaveLength(4); });
  it('rejects empty required fields and negative costs', () => { const errors=validateAsset({name:'',brand:'',serial:'',purchaseDate:'',cost:-3,status:'Available'},[]); expect(errors).toHaveProperty('name'); expect(errors).toHaveProperty('serial'); expect(errors).toHaveProperty('cost'); });
  it('rejects duplicate serial numbers regardless of case', () => { const asset={...initialAssets[0],id:undefined,serial:initialAssets[0].serial.toLowerCase()}; expect(validateAsset(asset,initialAssets)).toHaveProperty('serial'); });
  it('allows an existing asset to keep its serial during editing', () => { expect(validateAsset(initialAssets[0],initialAssets,initialAssets[0].id)).toEqual({}); });
  it('requires an assignee for In Use computers', () => { expect(validateAsset({...initialAssets[0],assignedTo:''},[],null)).toHaveProperty('assignedTo'); });
});
