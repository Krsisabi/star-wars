import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { swApi } from './api/apiSlice';
import charactersReducer from './charactersSlice';

const createStore = () => {
  return configureStore({
    reducer: {
      [swApi.reducerPath]: swApi.reducer,
      selectedCharacters: charactersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swApi.middleware),
  });
};

export const store = createStore();
export const wrapper = createWrapper(createStore, { debug: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
