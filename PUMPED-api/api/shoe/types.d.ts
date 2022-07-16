import type { ShoeColour } from '../colour/types';
import type { StockWithID } from '../stock/types';
export interface Shoe {
    ID: number;
    Name: string;
    Description: string;
    Price: number;
    releaseDate: number;
    Brand: string;
    BrandIcon: string;
    Style: string;
    Section: string;
    Collection: string;
    Stars: number;
    CoverImage: number;
}
export interface PartOfShoe {
    [x: string]: any;
    name?: string;
    description?: string;
    price?: number;
    releaseDate?: number;
    BrandID?: number;
    StyleID?: number;
    SectionID?: number;
    CollectionID?: number;
    CoverImage?: number;
}
export interface newShoe {
    name: string;
    description: string;
    price: number;
    releaseDate: number;
    BrandID: number;
    StyleID: number;
    SectionID: number;
    CollectionID: number;
    CoverImage: number;
    tags?: number[];
}
export interface newShoeWithID extends newShoe {
    ID: number;
}
export interface ShoeWithColours extends Shoe {
    colours: ShoeColour[];
}
export interface ShoeWithDetails extends ShoeWithColours {
    stock: StockWithID[];
}
export interface GetAllShoes {
    stars?: number;
    brand?: string;
    style?: string;
    section?: string;
    collection?: string;
    name?: string;
}
