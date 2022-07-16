export interface Collection {
    name: string;
}
export interface CollectionWithID extends Collection {
    ID: number;
}
export interface partOfCollection {
    name?: string;
}
