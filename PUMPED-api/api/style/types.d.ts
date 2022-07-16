export interface Style {
    name: string;
}
export interface StyleWithID extends Style {
    ID: number;
}
export interface partOfStyle {
    name?: string;
}
