import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/utils/libs/axios";

export const postQuestion = createAsyncThunk(
  "post-question",
  async (msg: string) => {
    try {
      const { data } = await http.post("/ai", { msg });

      return data?.message;
    } catch (error) {
      console.error(error);

      return "";
    }
  },
);
