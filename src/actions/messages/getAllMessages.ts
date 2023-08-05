import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetData } from "../../interfaces";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const getAllMessages = createAsyncThunk(
  "getAllMessages",
  async (data: GetData) => {
    const { limit, page } = data;

    try {
      const resp = await api.get(
        `/api/v1/messages?limit=${limit}&page=${page}`
      );

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
