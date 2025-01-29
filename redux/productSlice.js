import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getProducts = createAsyncThunk(
  'categories/getProducts',
  async (categoryName = null, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://technostore-1.onrender.com/products', {
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
    defaultProducts:[],
    loading:true,
    error:false,
}

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers: {
      searchProduct: (state, action) => {
        if (!action.payload.value || action.payload.value.trim() === "") {
          state.products =state.defaultProducts
        } else {
          state.products = state.defaultProducts.filter(product => 
            product.name.toLowerCase().startsWith(action.payload.value.toLowerCase())
          );
        }
      }
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
                state.defaultProducts=action.payload
              })
              .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
              });
    }
})
export const {searchProduct}=productSlice.actions;
export default productSlice.reducer