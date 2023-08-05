import { constant } from "../../configs/constant.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { envConfig } from "../../configs/env.config";
import { LoginData } from "../../interfaces";
import axios from "axios";

const { dev } = envConfig;
const { devURL, liveURL } = constant;
const rootUrl = dev ? devURL : liveURL;

export const loginDriver = createAsyncThunk(
  "loginDriver",
  async (loginData: LoginData) => {
    try {
      const { email, password } = loginData;
      const resp = await axios.post(`${rootUrl}/api/v1/users/login/driver`, {
        email,
        password,
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
