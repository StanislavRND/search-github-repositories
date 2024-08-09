import { configureStore } from '@reduxjs/toolkit';
import { sortedGithubApi } from '../sortedGithubApi';

export const store = configureStore({
  reducer: {
    [sortedGithubApi.reducerPath]: sortedGithubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sortedGithubApi.middleware),
});
