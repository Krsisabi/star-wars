import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './reducers';

export const store = configureStore({
  reducer: combineReducers({
    form: formReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
