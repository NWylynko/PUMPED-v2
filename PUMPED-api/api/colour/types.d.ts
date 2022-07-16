export interface basicColour {
    colour: string;
    hex: string;
}
export interface ShoeColour extends basicColour {
    ImageID: number;
}
export interface Colour extends basicColour {
    ShoeID: number;
    ImageIDs: number[];
}
export interface ColourWithID extends Colour {
    ID: number;
}
export interface partOfColour {
    colour?: string;
    hex?: string;
}
export interface addedColour {
    ShoeID: number;
    colour: string;
    hex: string;
}
export interface updatedColour extends ColourWithID {
    ColourID: number;
}
