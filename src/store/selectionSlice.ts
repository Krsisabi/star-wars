import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CharacterNormalized } from '~/types';

// The characters picked for export. They are kept whole, not by id, so a
// selection outlives the page they were picked on.
const initialState: CharacterNormalized[] = [];

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelected(state, { payload }: PayloadAction<CharacterNormalized>) {
      const index = state.findIndex(({ id }) => id === payload.id);

      if (index === -1) {
        state.push(payload);
      } else {
        state.splice(index, 1);
      }
    },
    clearSelection: () => [],
  },
  selectors: {
    selectSelected: (state) => state,
  },
});

export const { toggleSelected, clearSelection } = selectionSlice.actions;
export const { selectSelected } = selectionSlice.selectors;
