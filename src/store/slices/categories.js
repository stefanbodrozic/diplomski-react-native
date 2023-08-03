import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status, status } from "../../util";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      let categories = [];

      const querySnapshot = await getDocs(collection(db, "categories"));

      querySnapshot.forEach((doc) => {
        const { id, name, image } = doc.data();
        categories.push({
          id,
          name,
          image,
        });
      });

      return categories;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = Status.pending;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = Status.fullfiled;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = Status.failed;
      });
  },
});

export const getCategories = (state) => state.categories.data;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
