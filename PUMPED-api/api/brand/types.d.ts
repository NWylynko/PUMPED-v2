export interface Brand {
    name: string;
    website?: string;
    icon?: number;
}
export interface BrandWithID extends Brand {
    ID: number;
}
export interface partOfBrand {
    name?: string;
    website?: string;
    icon?: string;
}
export interface partOfBrandWithID extends partOfBrand {
    BrandID: number;
}
