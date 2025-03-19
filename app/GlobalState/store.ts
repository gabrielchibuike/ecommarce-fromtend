"use client";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "Token",
  initialState: { value: { tokenPayload: "" } },
  reducers: {
    tokenPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const productSlice = createSlice({
  name: "products",
  initialState: { value: { productPayload: [] } },
  reducers: {
    productPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { tokenPayload } = tokenSlice.actions;

export const { productPayload } = productSlice.actions;

export const store = configureStore({
  reducer: {
    getTokenResult: tokenSlice.reducer,
    productStore: productSlice.reducer,
  },
});
