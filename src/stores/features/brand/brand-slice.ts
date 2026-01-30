import { createSlice } from "@reduxjs/toolkit";

import { getBrand } from "./brand-action";

import { IBrand } from "@/utils/interfaces/ICompany";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [] as IBrand[],
  },
  reducers: {},
  extraReducers: (build) =>
    build.addCase(getBrand.fulfilled, (state, action) => {
      state.brands = action.payload;
    }),
});

export default brandSlice.reducer;
