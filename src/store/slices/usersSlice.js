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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user..", user);

        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log("data", doc.data());
          // setovati podatke u state
          // koristiti za edit profila
        });
      } else {
        // user is signed out
      }
    });
    return user;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  // {
  //   id: "",
  //   email: "",
  //   token: "",
  //   role: "",
  //   storeName: "",
  // },
  reducers: {
    // login: (state, action) => {
    //   const { id, email, token, role, storeName } = action.payload;
    //   state.id = id;
    //   state.email = email;
    //   state.token = token;
    //   state.role = role;
    //   state.storeName = storeName;
    // },
    // logout: (state, action) => {
    //   state.id = "";
    //   state.email = "";
    //   state.token = "";
    //   state.role = "";
    //   state.storeName = "";
    // },
    // loginRegisteredUser: (state, action) => {
    //   const { id, email, token, role, storeName } = action.payload;
    //   state.id = id;
    //   state.email = email;
    //   state.token = token;
    //   state.role = role;
    //   state.storeName = storeName;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log("succeeded getUserInfo", action.payload);

        state.categories = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { login, logout, loginRegisteredUser } = usersSlice.actions;
export default usersSlice.reducer;
