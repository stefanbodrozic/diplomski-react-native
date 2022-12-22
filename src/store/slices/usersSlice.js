import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const getUserInfo = createAsyncThunk("users/getUserInfo", async () => {
  try {
    var loggedInUser = null;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const {
            id,
            username,
            firstname,
            lastname,
            email,
            address,
            role,
            storeName,
          } = doc.data();

          loggedInUser = {
            id,
            username,
            firstname,
            lastname,
            email,
            address,
            role,
          };

          if (storeName) loggedInUser.storeName = storeName;
        });
      }
      // else {
      //   // user is signed out
      //   return loggedInUser;
      // }
      return loggedInUser;
    });
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {},
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getLoggedInUser = (state) => state.user;
export const getLoggedInUserStatus = (state) => state.users.status;

export default usersSlice.reducer;
