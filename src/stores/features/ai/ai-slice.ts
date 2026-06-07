import { createSlice } from "@reduxjs/toolkit";

import { postQuestion } from "./ai-action";

interface IChat {
  isMe: boolean;
  msg: string;
}

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    chatLoading: false,
    chats: [
      {
        isMe: false,
        msg: `Halo! Saya asisten AI bengkel. Silakan tanya profil bengkel, layanan, produk/sparepart, harga, atau estimasi biaya. Jika ingin dibantu admin langsung, klik tombol WhatsApp.`,
      },
    ] as IChat[],
  },
  reducers: {
    setChat: (state, action) => {
      state.chats = [...state.chats, { isMe: true, msg: action.payload }];
    },
  },
  extraReducers: (build) =>
    build
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.chats = [...state.chats, { isMe: false, msg: action.payload }];
        state.chatLoading = false;
      })
      .addCase(postQuestion.pending, (state) => {
        state.chatLoading = true;
      }),
});

export const { setChat } = aiSlice.actions;
export default aiSlice.reducer;
