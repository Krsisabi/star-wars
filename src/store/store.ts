import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { swApi } from './api/apiSlice';
import { selectionSlice } from './selectionSlice';

const rootReducer = combineSlices(swApi, selectionSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
