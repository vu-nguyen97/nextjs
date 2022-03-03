import { createSlice, current } from "@reduxjs/toolkit";

export interface Order {
  id: string;
  accountId: string;
  gameId: string;
  gameName: string;
  gameIcon: string;
  packages: Pack[];
}

export interface Pack {
  id: string;
  icon: string;
  usdValue: number;
  discountPercentage: number;
  quantity: number;
}

interface OrderState {
  data?: Order;
}

const initialState: OrderState = {};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      state.data = payload;
    },
    deleteOrder: (state) => {
      delete state.data;
    },
  },
});

export const { addOrder, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
