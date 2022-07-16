import router from './router';
import { getCollection } from './getCollection';
import { addCollection } from './addCollection';
import { updateCollection } from './updateCollection';
import { removeCollection } from './removeCollection';
import type { Collection, partOfCollection, CollectionWithID } from './types';
export { getCollection, addCollection, updateCollection, removeCollection, };
export type { Collection, partOfCollection, CollectionWithID, };
export default router;
