import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { constant } from "../configs/constant.config";
import { envConfig } from "../configs/env.config";
import { manualPersistor } from "./store.utils";
import { UserData } from "../interfaces";
import jwt_decode from "jwt-decode";
import store from "../store/store";
import dayjs from "dayjs";

const { dev } = envConfig;
const { devURL, liveURL } = constant;

class ApiClient {
  private dev: boolean;
  private devURL: string;
  private liveURL: string;
  private rootUrl: string;
  private axiosInstance: AxiosInstance;
  private axiosFormDataInstance: AxiosInstance;

  constructor() {
    this.dev = dev;
    this.devURL = devURL;
    this.liveURL = liveURL;
    this.rootUrl = this.dev ? this.devURL : this.liveURL;

    this.axiosInstance = axios.create({
      baseURL: this.rootUrl,
      headers: {
        Accept: "application/json",
      },
    });

    this.axiosFormDataInstance = axios.create({
      baseURL: this.rootUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(async (req) => {
      const userData: UserData | null = store.getState().auth.userData || null;

      if (!userData) return req;

      const { accessToken, refreshToken, role } = userData;

      const user = jwt_decode(accessToken) as any;

      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      }

      const response = await this.axiosInstance.post(
        `${this.rootUrl}${
          role === "User"
            ? "/api/v1/users/login"
            : role === "Driver"
            ? "/api/v1/users/login/driver"
            : role === "Rider"
            ? "/api/v1/users/login/rider"
            : "/api/v1/users/login/admin"
        }`,
        {
          refresh: refreshToken,
        }
      );

      const resp = response.data;

      manualPersistor(resp.data);
      req.headers.Authorization = `Bearer ${resp.data.accessToken}`;
      return req;
    });

    this.axiosFormDataInstance.interceptors.request.use(async (req) => {
      const userData: UserData | null = store.getState().auth.userData || null;

      if (!userData?.accessToken) return req;

      const { accessToken, refreshToken, role } = userData;

      const user = jwt_decode(accessToken) as any;

      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      }

      const response = await this.axiosInstance.post(
        `${this.rootUrl}${
          role === "User"
            ? "/api/v1/users/login"
            : role === "Driver"
            ? "/api/v1/users/login/driver"
            : role === "Rider"
            ? "/api/v1/users/login/rider"
            : "/api/v1/users/login/admin"
        }`,
        {
          refresh: refreshToken,
        }
      );

      const resp = response.data;

      manualPersistor(resp.data);
      req.headers.Authorization = `Bearer ${resp.data.accessToken}`;
      return req;
    });
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get(url, config);
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(url, data, config);
  }

  public put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put(url, data, config);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete(url, config);
  }

  public getFormDataInstance() {
    return this.axiosFormDataInstance;
  }

  public getAxiosInstance() {
    console.log(this.axiosInstance.defaults);
    return this.axiosInstance;
  }
}

export default ApiClient;
