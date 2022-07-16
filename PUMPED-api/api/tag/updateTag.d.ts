import type { partOfTag } from './types';
export declare function updateTag(TagID: number, fields: partOfTag): Promise<{
    tag?: string | undefined;
    TagID: number;
}>;
export default updateTag;
