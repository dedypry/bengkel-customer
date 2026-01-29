import { createSlice } from "@reduxjs/toolkit";

import { getWo, getWoDetail } from "./wo-action";

import { IPagination } from "@/utils/interfaces/IPagination";
import { IWo } from "@/utils/interfaces/IWo";

const woSlice = createSlice({
  name: "wo-slice",
  initialState: {
    history: null as IPagination<IWo> | null,
    woQuery: {
      pageSize: 10,
      page: 1,
      q: "",
      vehicle_id: null,
    },
    detail: null as IWo | null,
  },
  reducers: {
    setWoQuery: (state, action) => {
      state.woQuery = {
        ...state.woQuery,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getWo.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getWoDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      }),
});

export const { setWoQuery } = woSlice.actions;
export default woSlice.reducer;
