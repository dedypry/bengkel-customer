import { createSlice } from "@reduxjs/toolkit";

import { getBooking } from "./booking-action";

import { IBooking } from "@/utils/interfaces/IBooking";
import { IPagination } from "@/utils/interfaces/IPagination";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: null as IPagination<IBooking> | null,
    bookingQuery: {
      pageSize: 10,
      page: 1,
      q: "",
    },
  },
  reducers: {
    setBookingQuery: (state, action) => {
      state.bookingQuery = {
        ...state.bookingQuery,
        ...action.payload,
      };
    },
  },
  extraReducers: (build) =>
    build.addCase(getBooking.fulfilled, (state, action) => {
      state.bookings = action.payload;
    }),
});

export const { setBookingQuery } = bookingSlice.actions;
export default bookingSlice.reducer;
