import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/utils/libs/axios";

export const getProfile = createAsyncThunk("get-profile", async () => {
  try {
    const { data } = await http.get("auth/profile");

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
});
