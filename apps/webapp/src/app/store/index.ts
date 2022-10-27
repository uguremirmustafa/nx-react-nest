import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/user-slice';
import { appApi } from './services/api';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
