import { updateIsReadMessage } from "../../actions/messages/updateIsReadMessage";
import { getAllUserMessages } from "../../actions/messages/getAllUserMessages";
import { getSingleMessage } from "../../actions/messages/getSingleMessage";
import { getAllMessages } from "../../actions/messages/getAllMessages";
import { MessageSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    isLoading: false,
    errorAll: null,
    errorUser: null,
    errorSing: null,
    errorUpd: null,
    successAll: false,
    successUser: false,
    successSing: false,
    successUpd: false,
    messageAll: null,
    messageUser: null,
    messageSing: null,
    messageUpd: null,
    statusAll: null,
    statusUser: null,
    statusSing: null,
    statusUpd: null,
    totalPages: 0,
    msgCount: null,
    messageData: {},
    messageArrData: null,
  } as MessageSliceData,
  reducers: {
    setMessageData: (state, { payload }) => {
      state.messageData = payload;
    },
    resetAllData: (state) => {
      state.successAll = false;
      state.errorAll = null;
      state.messageAll = null;
      state.statusAll = null;
    },
    resetUserData: (state) => {
      state.successUser = false;
      state.errorUser = null;
      state.messageUser = null;
      state.statusUser = null;
    },
    resetSingData: (state) => {
      state.successSing = false;
      state.errorSing = null;
      state.messageSing = null;
      state.statusSing = null;
    },
    resetUpdData: (state) => {
      state.successUpd = false;
      state.errorUpd = null;
      state.messageUpd = null;
      state.statusUpd = null;
    },
    resetMessageData: (state) => {
      state.isLoading = false;
      state.errorAll = null;
      state.errorUser = null;
      state.errorSing = null;
      state.errorUpd = null;
      state.successAll = false;
      state.successUser = false;
      state.successSing = false;
      state.successUpd = false;
      state.messageAll = null;
      state.messageUser = null;
      state.messageSing = null;
      state.messageUpd = null;
      state.statusAll = null;
      state.statusUser = null;
      state.statusSing = null;
      state.msgCount = null;
      state.statusUpd = null;
      state.totalPages = 0;
      state.msgCount = null;
      state.messageData = null;
      state.messageArrData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successAll = true;
        state.messageAll = payload.message;
        state.statusAll = payload.code;
        state.messageArrData = payload.data;
        state.totalPages = payload.other.totalPages;
        state.msgCount = payload.other.msgCount;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorAll = error;
        state.statusAll = +(statusCode as string);
        state.messageAll = errorMsg as string;
      })
      .addCase(getAllUserMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUser = true;
        state.messageUser = payload.message;
        state.statusUser = payload.code;
        state.messageArrData = payload.data;
        state.totalPages = payload.other.totalPages;
        state.msgCount = payload.other.msgCount;
      })
      .addCase(getAllUserMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserMessages.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorUser = error;
        state.statusUser = +(statusCode as string);
        state.messageUser = errorMsg as string;
      })
      .addCase(getSingleMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successSing = true;
        state.messageSing = payload.message;
        state.statusSing = payload.code;
        state.messageData = payload.data;
      })
      .addCase(getSingleMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleMessage.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorSing = error;
        state.statusSing = +(statusCode as string);
        state.messageSing = errorMsg as string;
      })
      .addCase(updateIsReadMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUpd = true;
        state.messageUpd = payload.message;
        state.statusUpd = payload.code;
        state.messageData = payload.data;
      })
      .addCase(updateIsReadMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIsReadMessage.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorUpd = error;
        state.statusUpd = +(statusCode as string);
        state.messageUpd = errorMsg as string;
      });
  },
});

export const {
  setMessageData,
  resetAllData,
  resetUserData,
  resetSingData,
  resetUpdData,
  resetMessageData,
} = messageSlice.actions;
export default messageSlice.reducer;
