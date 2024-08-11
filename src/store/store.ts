import { configureStore } from '@reduxjs/toolkit';
import { swApi } from './api/apiSlice';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    [swApi.reducerPath]: swApi.reducer,
    selectedCharacters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
