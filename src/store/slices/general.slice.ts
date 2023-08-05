import { GeneralSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    showMsgModal: false,
    showReqModal: false,
    isLoading: false,
    hasError: false,
    pageNum: 1,
    filterPgNum: 1,
    hasMore: true,
    isNext: false,    
    selectedOpt: "",
    requestId: null,
    messageId: null,
    showSideBar: false,
  } as GeneralSliceData,
  reducers: {
    showMessageModal: (state, {payload}:{payload: boolean}) => {
      state.showMsgModal = payload;
    },
    showRequestModal: (state, {payload}:{payload: boolean}) => {
      state.showReqModal = payload;
    },
    setIsLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
    setHasError: (state, { payload }: { payload: boolean }) => {
      state.hasError = payload;
    },
    setPageNum: (state) => {
      state.pageNum = state.pageNum + 1
    },
    setHasMore: (state, {payload}: { payload: boolean }) => {
      state.hasMore = payload;
    },
    setFilterPgNum: (state) => {
      state.filterPgNum += 1;
    },
    setIsNext: (state, {payload}: { payload: boolean }) => {
      state.isNext = payload;
    },
    setSelectedOpt: (state, {payload}:{payload: string}) => {
      state.selectedOpt = payload
    },
    setRequestId: (state, { payload }:{ payload: string }) => {
      state.requestId = payload;
    },
    setMessageId: (state, { payload }:{ payload: string }) => {
      state.messageId = payload;
    },
    setShowSideBar: (state, {payload}:{payload: boolean}) => {
      state.showSideBar = payload
    }
  },
});

export const {
  showMessageModal,
  showRequestModal,
  setIsLoading,
  setHasError,
  setPageNum,
  setHasMore,
  setFilterPgNum,
  setIsNext,
  setSelectedOpt,
  setRequestId,
  setMessageId,
  setShowSideBar,
} = generalSlice.actions;
export default generalSlice.reducer;
