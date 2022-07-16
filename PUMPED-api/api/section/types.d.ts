export interface Section {
    name: string;
}
export interface SectionWithID extends Section {
    ID: number;
}
export interface partOfSection {
    name?: string;
}
