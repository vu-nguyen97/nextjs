import { createSlice } from "@reduxjs/toolkit";

interface Account {
  user: any;
  token: string;
}

const initialState: Account = {
  user: {},
  token: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => {},
  },
});

export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;
