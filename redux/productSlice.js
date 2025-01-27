import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
export const getProducts = createAsyncThunk(
  'categories/getProducts',
  async (categoryName = null, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        params: categoryName ? { categoryName } : {},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Xəta'
      );
    }
  }
);


const initialState={
    products:[],
    loading:true,
    error:false,
}

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
            builder
              .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
              })
              .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
              });
    }
})
export const {}=productSlice.actions;
export default productSlice.reducer