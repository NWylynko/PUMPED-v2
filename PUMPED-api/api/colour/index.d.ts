import router from './router';
import { getColour } from './getColour';
import { addColour } from './addColour';
import { updateColour } from './updateColour';
import { removeColour } from './removeColour';
import type { Colour, partOfColour, ColourWithID, basicColour, ShoeColour, addedColour } from './types';
export { getColour, addColour, updateColour, removeColour, };
export type { Colour, partOfColour, ColourWithID, basicColour, ShoeColour, addedColour, };
export default router;
