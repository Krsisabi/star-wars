import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharacterNormilized } from '~/types';

export const initialState: CharacterNormilized[] = [];

const charactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggleChecked(state, action: PayloadAction<CharacterNormilized>) {
      const character = action.payload;
      const index = state.findIndex((c) => c.id === character.id);

      if (index === -1) {
        state.push(character);
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { toggleChecked } = charactersSlice.actions;

export default charactersSlice.reducer;
