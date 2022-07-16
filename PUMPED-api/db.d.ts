import sqlite3 from 'sqlite3';
interface Result extends sqlite3.RunResult {
    errno?: number;
    code?: string;
    message?: string;
    stack?: string;
}
export interface SQLError {
    error: Error | null;
    sql: string;
    params: any[];
    result?: Result;
    stack?: string;
    message?: string;
}
declare class Database {
    db: sqlite3.Database;
    open(): Promise<boolean>;
    close(): Promise<number>;
    run(sql: string, params?: any[]): Promise<Result>;
    all(sql: string, params?: any[]): Promise<any[]>;
    get(sql: string, params?: any[]): Promise<any>;
    exec(sql: string): Promise<unknown>;
}
export declare const SQL: {
    tables: {
        Brand: string;
        Collection: string;
        Colour: string;
        ColourImage: string;
        Customer: string;
        Image: string;
        Order: string;
        OrderItem: string;
        Review: string;
        Section: string;
        Shoe: string;
        ShoeTag: string;
        Stock: string;
        Style: string;
        Tag: string;
        WishList: string;
    };
    testData: string;
};
declare const db: Database;
export default db;
