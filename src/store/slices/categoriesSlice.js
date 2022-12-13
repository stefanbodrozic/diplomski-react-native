import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: "idle", // za pracenje stanja promise-a => 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      // ovde ide query
      console.log("fetch categories");

      //   return ODGOVOR
      return [
        {
          id: 1,
          name: "test",
        },
        {
          id: 2,
          name: "test2",
        },
      ];
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

        state.categories = "NESTO ";
        // state.categories = action.payload; // ili categories ako se radi izmena
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const selectAllCategories = (state) => state.categories.categories;
export const getCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) =>
  state.categories.categories.status;
export const getCategoriesError = (state) => state.categories.categories.error;

// export const getByName = (state) => {};

// export const getById = (state) => {};

export default categoriesSlice.reducer;
