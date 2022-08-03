import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {
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
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
