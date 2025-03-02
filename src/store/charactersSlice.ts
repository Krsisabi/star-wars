import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharacterNormalized } from '~/types';

export const initialState: CharacterNormalized[] = [];

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggleChecked(state, action: PayloadAction<CharacterNormalized>) {
      const character = action.payload;
      const index = state.findIndex((c) => c.id === character.id);

      if (index === -1) {
        state.push(character);
      } else {
        state.splice(index, 1);
      }
    },
    deleteAllItems: () => [],
  },
});

export const { toggleChecked, deleteAllItems } =
  selectedCharactersSlice.actions;

export default selectedCharactersSlice.reducer;
