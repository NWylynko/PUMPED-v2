import type { Stock } from './types';
export declare function addStock({ ShoeID, ColourID, size, stock, }: Stock): Promise<{
    ShoeID: number;
    ColourID: number;
    size: number;
    stock: number;
}>;
export default addStock;
