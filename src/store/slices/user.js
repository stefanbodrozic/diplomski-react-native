import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Status } from "../../util";

export const fetchUserDetails = createAsyncThunk(
  "users/userDetails",
  async (email) => {
    try {
      let user = null;

      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          id,
          username,
          firstname,
          lastname,
          email,
          role,
          address,
          storeName,
          storeRefId,
        } = doc.data();

        user = {
          id,
          username,
          firstname,
          lastname,
          email,
          role,
          address,
        };

        if (storeName) {
          user.storeName = storeName;
          user.storeRefId = storeRefId;
        }
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: {},
  status: Status.IDLE,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserDetails.pending, (state, _action) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = Status.FULLFILED;
        state.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, _action) => {
        state.status = Status.FAILED;
      });
  },
});

export const getUserData = (state) => state.user.data;
export const getUserStatus = (state) => state.user.status;

export default userSlice.reducer;
