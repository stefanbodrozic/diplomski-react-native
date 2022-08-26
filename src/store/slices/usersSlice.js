import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    token: "",
    role: "",
    storeName: "",
  },
  reducers: {
    login: (state, action) => {
      const { id, email, token, role, storeName } = action.payload;
      state.id = id;
      state.email = email;
      state.token = token;
      state.role = role;
      state.storeName = storeName;
    },
    logout: (state, action) => {
      state.id = "";
      state.email = "";
      state.token = "";
      state.role = "";
      state.storeName = "";
    },
    loginRegisteredUser: (state, action) => {
      const { id, email, token, role, storeName } = action.payload;
      state.id = id;
      state.email = email;
      state.token = token;
      state.role = role;
      state.storeName = storeName;
    },
  },
});

export const { login, logout, loginRegisteredUser } = usersSlice.actions;
export default usersSlice.reducer;
