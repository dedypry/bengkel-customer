import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/utils/libs/axios";
import { IQuery } from "@/utils/interfaces/global";

export const getWo = createAsyncThunk("get-wo", async (params: IQuery) => {
  try {
    const { data } = await http.get(`/customers/wo/list`, { params });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
});

export const getWoDetail = createAsyncThunk(
  "get-wo-detail",
  async (id: number | string) => {
    try {
      const { data } = await http.get(`/customers/wo/${id}`);

      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  },
);
