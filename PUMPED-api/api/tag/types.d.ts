export interface Tag {
    tag: string;
}
export interface TagWithID extends Tag {
    ID: number;
}
export interface partOfTag {
    tag?: string;
}
