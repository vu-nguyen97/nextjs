import { createSlice, current } from "@reduxjs/toolkit";

interface OrderInfo {
  game: any;
  pack: any;
  quantity: number;
}

interface OrderState {
  data: OrderInfo[];
}

const initialState: OrderState = {
  data: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      state.data.push(payload);
    },
    editOrder: (state, { payload }) => {},
    deleteOrder: (state, { payload }) => {
      state.data.splice(payload, 1);
    },
  },
});

export const { addOrder, editOrder, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
