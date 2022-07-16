import router from './router';
import { getTag } from './getTag';
import { addTag } from './addTag';
import { updateTag } from './updateTag';
import { removeTag } from './removeTag';
import type { Tag, partOfTag, TagWithID } from './types';
export { getTag, addTag, updateTag, removeTag, };
export type { Tag, partOfTag, TagWithID, };
export default router;
