import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const updateIsReadRequest = createAsyncThunk(
  "updateIsReadRequest",
  async (id: string) => {
    try {
      const resp = await api.get(`/api/v1/requests/isread/${id}`);

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
