import type { partOfStock } from './types';
export declare function updateStock(StockID: number, fields: partOfStock): Promise<{
    stock?: number | undefined;
    StockID: number;
}>;
export default updateStock;
