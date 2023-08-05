import { createAsyncThunk } from "@reduxjs/toolkit";
import { AssignReqData } from "../../interfaces";
import ApiClient from "../../utils/axios.util";

const api = new ApiClient();

export const assignRequest = createAsyncThunk(
  "assignRequest",
  async (assignReqData: AssignReqData) => {
    try {
      const {
        id,
        driverEmail,
        riderEmail,
        userEmail,
        location,
        plate_num,
        color,
        brand,
      } = assignReqData;

      const resp = await api.post(`/api/v1/requests/assign`, {
        id,
        driverEmail,
        riderEmail,
        userEmail,
        location,
        plate_num,
        color,
        brand,
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
