import { createSlice, current } from "@reduxjs/toolkit";

const initialState: string[] = [];

const orderSlice = createSlice({
  name: "metamask",
  initialState,
  reducers: {
    addAdr: (state, { payload }) => {
      return payload;
    },
    deleteAdr: (state) => {
      return [];
    },
  },
});

export const { addAdr, deleteAdr } = orderSlice.actions;

export default orderSlice.reducer;
