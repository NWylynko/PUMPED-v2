export interface Customer {
    firstName?: string;
    lastName?: string;
}
export interface CustomerWithID extends Customer {
    ID: number;
}
