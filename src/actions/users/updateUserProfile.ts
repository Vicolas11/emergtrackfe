import { UpdateUserProfile } from "../../interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (updateUserData: UpdateUserProfile) => {
    try {
      const { firstName, lastName, username, phone, avatar } = updateUserData;

      const resp = await api.post(`/api/v1/users/update/profile`, {
        firstName,
        lastName,
        username,
        phone,
        avatar,
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
