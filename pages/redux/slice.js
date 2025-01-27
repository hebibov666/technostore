import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || 'Error'
        );
      }
    }
  );


const initialState={
    categories:[],
    loading:true,
    error:false,
    sidebar:false,
    basket:false,
}

export const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
openSidebar:(state)=>{
  state.sidebar=state.sidebar ? false : true
},
openBasket:(state)=>{
  state.basket=state.basket ? false : true
  if(state.basket===true){
    document.body.style.overflow="hidden"
  }else{
    document.body.style.overflow="scroll"
  }
}
    },
    extraReducers:(builder) => {
            builder
              .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload; 
              })
              .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
              });
    }
})
export const {openSidebar,openBasket}=categorySlice.actions;
export default categorySlice.reducer