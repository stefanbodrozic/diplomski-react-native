import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    token: "",
  },
  reducers: {
    login: (state, action) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logout: (state, action) => {
      state.email = "";
      state.token = "";
    },
    loginRegisteredUser: (state, action) => {
      const { id, email, token } = action.payload;
      state.id = id;
      state.email = email;
      state.token = token;
    },
  },
});

export const { login, logout, loginRegisteredUser } = usersSlice.actions;
export default usersSlice.reducer;
