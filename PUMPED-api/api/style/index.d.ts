import router from './router';
import { getStyle } from './getStyle';
import { addStyle } from './addStyle';
import { updateStyle } from './updateStyle';
import { removeStyle } from './removeStyle';
import type { Style, partOfStyle, StyleWithID } from './types';
export { getStyle, addStyle, updateStyle, removeStyle, };
export type { Style, partOfStyle, StyleWithID, };
export default router;
