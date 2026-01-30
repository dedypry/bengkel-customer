import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/utils/libs/axios";

export const getBrand = createAsyncThunk("get-brand", async () => {
  try {
    const { data } = await http.get("/customers/brands");

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
});
