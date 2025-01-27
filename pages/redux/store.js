import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slice';
import { productSlice } from './productSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer, 
    products:productSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(),
})