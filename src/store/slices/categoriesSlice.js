import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../firebase/firebase-config";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

const initialState = {
  categories: [],
  status: "idle", // za pracenje stanja promise-a => 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      let categories = [];

      const q = query(
        collection(db, "categories"),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { id, name } = doc.data();
        const category = {
          id,
          name,
        };

        categories.push(category);
      });

      return categories;
    } catch (error) {
      return error.message;
    }
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // gleda na promise status
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        // ovde moze da se filtrira response
        // const categories = action.payload.map((category) => {...})

        state.categories = action.payload; // ili categories ako se radi izmena
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
