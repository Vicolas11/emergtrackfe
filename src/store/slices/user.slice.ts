import { updateUserPassword } from "../../actions/users/updateUserPassword";
import { updateUserProfile } from "../../actions/users/updateUserProfile";
import { getAllDrivers } from "../../actions/users/getAllDrivers";
import { getAllRiders } from "../../actions/users/getAllRiders";
import { UserSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getAuthUser } from "../../actions/users/getAuthUser";
import { getAllUsers } from "../../actions/users/getAllUsers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isLoadingPro: false,
    isLoadingPwd: false,
    errorDri: null,
    errorRid: null,
    errorUse: null,
    errorPro: null,
    errorPwd: null,
    successDri: false,
    successRid: false,
    successUse: false,
    successPro: false,
    successPwd: false,
    messageDri: null,
    messageRid: null,
    messageUse: null,
    messagePro: null,
    messagePwd: null,
    statusDri: null,
    statusRid: null,
    statusUse: null,
    statusPro: null,
    statusPwd: null,
    totalPagesDri: 0,
    totalPagesRid: 0,
    totalPagesUse: 0,
    driverArrData: null,
    riderArrData: null,
    userArrData: null,
    userData: null,
  } as UserSliceData,
  reducers: {
    resetDriData: (state) => {
      state.successDri = false;
      state.errorDri = null;
      state.messageDri = null;
      state.statusDri = null;
    },
    resetRidData: (state) => {
      state.successRid = false;
      state.errorRid = null;
      state.messageRid = null;
      state.statusRid = null;
    },
    resetUseData: (state) => {
      state.successUse = false;
      state.errorUse = null;
      state.messageUse = null;
      state.statusUse = null;
    },
    resetProData: (state) => {
      state.successPro = false;
      state.errorPro = null;
      state.messagePro = null;
      state.statusPro = null;
    },
    resetPwdData: (state) => {
      state.successPwd = false;
      state.errorPwd = null;
      state.messagePwd = null;
      state.statusPwd = null;
    },
    resetAuthData: (state) => {
      state.successAuth = false;
      state.errorAuth = null;
      state.messageAuth = null;
      state.statusAuth = null;
    },
    resetUserData: (state) => {
      state.isLoading = false;
      state.isLoadingPro = false;
      state.isLoadingPwd = false;
      state.errorDri = null;
      state.errorRid = null;
      state.errorUse = null;
      state.errorPro = null;
      state.errorPwd = null;
      state.successDri = false;
      state.successRid = false;
      state.successUse = false;
      state.successPro = false;
      state.successPwd = false;
      state.messageDri = null;
      state.messageRid = null;
      state.messageUse = null;
      state.messagePro = null;
      state.messagePwd = null;
      state.statusDri = null;
      state.statusRid = null;
      state.statusUse = null;
      state.statusPro = null;
      state.statusPwd = null;
      state.totalPagesDri = 0;
      state.totalPagesRid = 0;
      state.totalPagesUse = 0;
      state.driverArrData = null;
      state.riderArrData = null;
      state.userArrData = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDrivers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successDri = true;
        state.messageDri = payload.message;
        state.statusDri = payload.code;
        state.driverArrData = payload.data;
        state.totalPagesDri = payload.other.totalPages;
      })
      .addCase(getAllDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDrivers.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorDri = error;
        state.statusDri = +(statusCode as string);
        state.messageDri = errorMsg as string;
      })
      .addCase(getAllRiders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successRid = true;
        state.messageRid = payload.message;
        state.statusRid = payload.code;
        state.riderArrData = payload.data;
        state.totalPagesRid = payload.other.totalPages;
      })
      .addCase(getAllRiders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRiders.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorRid = error;
        state.statusRid = +(statusCode as string);
        state.messageRid = errorMsg as string;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUse = true;
        state.messageUse = payload.message;
        state.statusUse = payload.code;
        state.userArrData = payload.data;
        state.totalPagesUse = payload.other.totalPages;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorUse = error;
        state.statusUse = +(statusCode as string);
        state.messageUse = errorMsg as string;
      })
      .addCase(getAuthUser.fulfilled, (state, { payload }) => {
        state.isLoadingAuth = false;
        state.successAuth = true;
        state.messageAuth = payload.message;
        state.statusAuth = payload.code;
        state.userData = payload.data;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(getAuthUser.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoadingAuth = false;
        state.errorAuth = error;
        state.statusAuth = +(statusCode as string);
        state.messageAuth = errorMsg as string;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        state.isLoadingPwd = false;
        state.successPwd = true;
        state.messagePwd = payload.message;
        state.statusPwd = payload.code;
        state.userData = payload.data;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoadingPwd = true;
      })
      .addCase(updateUserPassword.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoadingPwd = false;
        state.errorPwd = error;
        state.statusPwd = +(statusCode as string);
        state.messagePwd = errorMsg as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.isLoadingPro = false;
        state.successPro = true;
        state.messagePro = payload.message;
        state.statusPro = payload.code;
        state.userData = payload.data;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoadingPro = true;
      })
      .addCase(updateUserProfile.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoadingPro = false;
        state.errorPro = error;
        state.statusPro = +(statusCode as string);
        state.messagePro = errorMsg as string;
      });
  },
});

export const {
  resetDriData,
  resetProData,
  resetPwdData,
  resetRidData,
  resetUserData,
  resetAuthData,
} = userSlice.actions;
export default userSlice.reducer;
