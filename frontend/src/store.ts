import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import Reducer from './api/slice';

export const store = configureStore({
  reducer: {
    users: Reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
