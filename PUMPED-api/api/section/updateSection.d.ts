import type { partOfSection } from './types';
export declare function updateSection(SectionID: number, fields: partOfSection): Promise<{
    name?: string | undefined;
    SectionID: number;
}>;
export default updateSection;
