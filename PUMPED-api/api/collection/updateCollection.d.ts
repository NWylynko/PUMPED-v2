import type { partOfCollection } from './types';
export declare function updateCollection(CollectionID: number, fields: partOfCollection): Promise<{
    name?: string | undefined;
    CollectionID: number;
}>;
export default updateCollection;
