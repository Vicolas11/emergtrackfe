import { updateIsReadRequest } from "../../actions/requests/updateIsReadRequest";
import { getAllUsersRequest } from "../../actions/requests/getAllUserRequests";
import { getSingleRequest } from "../../actions/requests/getSingleRequest";
import { getAllRequest } from "../../actions/requests/getAllRequests";
import { assignRequest } from "../../actions/requests/assignRequest";
import { cancelRequest } from "../../actions/requests/cancelRequest";
import { sendRequest } from "../../actions/requests/sendRequest";
import { RequestSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    isLoading: false,
    isLoadingAss: false,
    errorAll: null,
    errorUser: null,
    errorSing: null,
    errorUpd: null,
    errorAss: null,
    errorCan: null,
    errorSen: null,
    successAll: false,
    successUser: false,
    successSing: false,
    successUpd: false,
    successAss: false,
    successCan: false,
    successSen: false,
    messageAll: null,
    messageUser: null,
    messageSing: null,
    messageUpd: null,
    messageAss: null,
    messageCan: null,
    messageSen: null,
    statusAll: null,
    statusUser: null,
    statusSing: null,
    statusUpd: null,
    statusAss: null,
    statusCan: null,
    statusSen: null,
    totalPages: 0,
    reqCount: null,
    requestArrData: null,
    requestData: {},
  } as RequestSliceData,
  reducers: {
    setRequestData: (state, { payload }) => {
      state.requestData = payload;
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
    resetAssData: (state) => {
      state.successAss = false;
      state.errorAss = null;
      state.messageAss = null;
      state.statusAss = null;
    },
    resetCanData: (state) => {
      state.successCan = false;
      state.errorCan = null;
      state.messageCan = null;
      state.statusCan = null;
    },
    resetSenData: (state) => {
      state.successSen = false;
      state.errorSen = null;
      state.messageSen = null;
      state.statusSen = null;
    },
    resetRequestData: (state) => {
      state.isLoading = false;
      state.errorAll = null;
      state.errorUser = null;
      state.errorSing = null;
      state.errorUpd = null;
      state.errorAss = null;
      state.errorCan = null;
      state.errorSen = null;
      state.successAll = false;
      state.successUser = false;
      state.successSing = false;
      state.successUpd = false;
      state.successAss = false;
      state.successCan = false;
      state.successSen = false;
      state.messageAll = null;
      state.messageUser = null;
      state.messageSing = null;
      state.messageUpd = null;
      state.messageAss = null;
      state.messageCan = null;
      state.messageSen = null;
      state.statusAll = null;
      state.statusUser = null;
      state.statusSing = null;
      state.statusUpd = null;
      state.statusAss = null;
      state.statusCan = null;
      state.reqCount = null;
      state.statusSen = null;
      state.totalPages = 0;
      state.reqCount = null;
      state.requestArrData = null;
      state.requestData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignRequest.fulfilled, (state, { payload }) => {
        state.isLoadingAss = false;
        state.successAss = true;
        state.messageAss = payload.message;
        state.statusAss = payload.code;
        state.requestData = payload.data;
      })
      .addCase(assignRequest.pending, (state) => {
        state.isLoadingAss = true;
      })
      .addCase(assignRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoadingAss = false;
        state.errorAss = error;
        state.statusAss = +(statusCode as string);
        state.messageAss = errorMsg as string;
      })
      .addCase(cancelRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successCan = true;
        state.messageCan = payload.message;
        state.statusCan = payload.code;
        state.requestData = payload.data;
      })
      .addCase(cancelRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorCan = error;
        state.statusCan = +(statusCode as string);
        state.messageCan = errorMsg as string;
      })
      .addCase(sendRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successSen = true;
        state.messageSen = payload.message;
        state.statusSen = payload.code;
        state.requestData = payload.data;
      })
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorSen = error;
        state.statusSen = +(statusCode as string);
        state.messageSen = errorMsg as string;
      })
      .addCase(getAllRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successAll = true;
        state.messageAll = payload.message;
        state.statusAll = payload.code;
        state.requestArrData = payload.data;
        state.totalPages = payload.other.totalPages;
        state.reqCount = payload.other.reqCount;
      })
      .addCase(getAllRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorAll = error;
        state.statusAll = +(statusCode as string);
        state.messageAll = errorMsg as string;
      })
      .addCase(getAllUsersRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUser = true;
        state.messageUser = payload.message;
        state.statusUser = payload.code;
        state.requestArrData = payload.data;
        state.totalPages = payload.other.totalPages;
        state.reqCount = payload.other.reqCount;
      })
      .addCase(getAllUsersRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorUser = error;
        state.statusUser = +(statusCode as string);
        state.messageUser = errorMsg as string;
      })
      .addCase(getSingleRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successSing = true;
        state.messageSing = payload.message;
        state.statusSing = payload.code;
        state.requestData = payload.data;
      })
      .addCase(getSingleRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRequest.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorSing = error;
        state.statusSing = +(statusCode as string);
        state.messageSing = errorMsg as string;
      })
      .addCase(updateIsReadRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUpd = true;
        state.messageUpd = payload.message;
        state.statusUpd = payload.code;
        state.requestData = payload.data;
      })
      .addCase(updateIsReadRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIsReadRequest.rejected, (state, { error }) => {
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
  setRequestData,
  resetAssData,
  resetCanData,
  resetSenData,
  resetSingData,
  resetUpdData,
  resetUserData,
  resetAllData,
  resetRequestData,
} = requestSlice.actions;
export default requestSlice.reducer;
