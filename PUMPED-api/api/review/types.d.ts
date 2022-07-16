export interface reviewDetails {
    stars: number;
    message: string;
    timestamp: number;
}
export interface Review extends reviewDetails {
    firstName: string;
    lastName: string;
}
export interface partOfReview {
    [x: string]: any;
    stars?: number;
    message?: string;
    timestamp?: number;
}
