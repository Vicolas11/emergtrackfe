import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendReqData } from "../../interfaces";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const sendRequest = createAsyncThunk(
  "sendRequest",
  async (sendReqData: SendReqData) => {
    try {
      const { plate_num, brand, vin, color, location, info } = sendReqData;

      const resp = await api.post(`/api/v1/requests/send`, {
        plate_num,
        brand,
        vin,
        color,
        location,
        info,
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
