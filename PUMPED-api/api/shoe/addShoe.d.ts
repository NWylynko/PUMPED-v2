import type { newShoe, newShoeWithID } from './types';
declare function addShoe({ name, description, price, releaseDate, BrandID, StyleID, SectionID, CollectionID, CoverImage, tags, }: newShoe): Promise<newShoeWithID>;
export default addShoe;
