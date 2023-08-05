import { UpdateUserPassword } from "../../interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const updateUserPassword = createAsyncThunk(
  "updateUserPassword",
  async (updateUserPasswordData: UpdateUserPassword) => {
    try {
      const { oldpassword, newpassword } = updateUserPasswordData;

      const resp = await api.post(`/api/v1/users/update/password`, {
        oldpassword,
        newpassword,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);
