import type { GetAllShoes, ShoeWithColours } from './types';
declare function getAllShoes({ brand, style, section, collection, name, stars, }: GetAllShoes): Promise<ShoeWithColours[]>;
export default getAllShoes;
