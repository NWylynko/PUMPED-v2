import type { partOfStyle } from './types';
export declare function updateStyle(StyleID: number, fields: partOfStyle): Promise<{
    name?: string | undefined;
    StyleID: number;
}>;
export default updateStyle;
