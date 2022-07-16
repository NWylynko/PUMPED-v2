import type { Request, Response, NextFunction } from 'express';
import type { SQLError } from './db';
export declare function notFound(req: Request, res: Response, next: NextFunction): void;
export declare function errorHandler(err: Error | SQLError | string, req: Request, res: Response, next: NextFunction): void;
export declare function requireJsonBody(req: Request, res: Response, next: NextFunction): void;
declare const _default: {
    notFound: typeof notFound;
    errorHandler: typeof errorHandler;
    requireJsonBody: typeof requireJsonBody;
};
export default _default;
