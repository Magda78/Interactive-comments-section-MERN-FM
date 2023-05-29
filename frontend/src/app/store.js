import { configureStore } from '@reduxjs/toolkit';

import dateReducer from '../features/dataSlice';

export const store = configureStore({
    reducer: {
        data: dateReducer,
      },
})