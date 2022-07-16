import type { partOfBrand, partOfBrandWithID } from './types';
export declare function updateBrand(BrandID: number, fields: partOfBrand): Promise<partOfBrandWithID>;
export default updateBrand;
