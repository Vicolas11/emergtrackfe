import { SerializedError } from "@reduxjs/toolkit";
import store, { rootReducer } from "./store/store";

export interface BackDropProps {
  children: JSX.Element;
}

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;

// Infer the `RootReducer` type from the rootReducer defined above
export type RootReducer = typeof rootReducer;

export type data = {
  link: string;
  title: string;
  State: string;
  LGA: string;
  views: number;
  date: string;
  id: string;
  actor: string;
};

export interface DummyDataType {
  [key: string]: data[];
}

export interface SelectedFileType {
  file: File | null;
  isUploaded: boolean;
}

export interface IEnvConfig {
  dev: boolean;
  prod: boolean;
  test: boolean;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface LoadingBtnProps {
  title: string;
  styles: any;
}

export interface IDummyTableData {
  id: number;
  icon: JSX.Element | null;
  name: string;
  date: string;
  type: string;
  size: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "User" | "Driver" | "Rider";
  phone: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  userId: string;
  phone: string;
  avatar: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  userId: string;
  email: string;
  phone: string;
  avatar: string;
  role: "User" | "Rider" | "Driver";
  createAt: string;
}

export interface RequestData {
  id: string;
  plate_num: string;
  brand: string;
  vin: string;
  color: string;
  location: string;
  info: string;
  isRead: boolean;
  status: "Cancelled" | "Granted" | "Pending";
  date: string;
  userId: null | string;
  driverId: null | string;
  riderId: null | string;
  user: null | UserInfo;
  rider: null | UserInfo;
  driver: null | UserInfo;
}

export interface MessageData {
  id: string;
  messageId: string;
  title: string;
  content: string;
  sender: string;
  isRead: boolean;
  date: string;
  userId: string;
}

export interface AssignReqData {
  id: string;
  driverEmail: string;
  riderEmail: string;
  userEmail: string;
  location: string;
  plate_num: string;
  color: string;
  brand: string;
}

export interface SendReqData {
  plate_num: string;
  brand: string;
  vin: string;
  color: string;
  location: string;
  info?: string;
}

export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateUserPassword {
  oldpassword: string;
  newpassword: string;
}

export interface GetData {
  limit?: number;
  page?: number;
}

export interface AuthSliceData {
  isAuth: boolean;
  isLoading: boolean;
  error: SerializedError | null;
  success: boolean;
  successReg: boolean;
  message: string | null;
  status: number | null;
  messageReg: string | null;
  statusReg: number | null;
  userData: UserData | null;
}

export interface GeneralSliceData {
  showMsgModal: boolean;
  showReqModal: boolean;
  isLoading: boolean;
  hasError: boolean;
  pageNum: number;
  filterPgNum: number;
  hasMore: boolean;
  isNext: boolean;
  selectedOpt: string;
  requestId: string | null;
  messageId: string | null;
  showSideBar: boolean;
}

export interface RequestSliceData {
  isLoading: boolean;
  isLoadingAss: boolean;
  errorAll: SerializedError | null;
  errorUser: SerializedError | null;
  errorSing: SerializedError | null;
  errorUpd: SerializedError | null;
  errorAss: SerializedError | null;
  errorCan: SerializedError | null;
  errorSen: SerializedError | null;
  successAll: boolean;
  successUser: boolean;
  successSing: boolean;
  successUpd: boolean;
  successAss: boolean;
  successCan: boolean;
  successSen: boolean;
  messageAll: string | null;
  messageUser: string | null;
  messageSing: string | null;
  messageUpd: string | null;
  messageAss: string | null;
  messageCan: string | null;
  messageSen: string | null;
  statusAll: number | null;
  statusUser: number | null;
  statusSing: number | null;
  statusUpd: number | null;
  statusAss: number | null;
  statusCan: number | null;
  statusSen: number | null;
  totalPages: number;
  reqCount: number | null;
  requestData: RequestData | null;
  requestArrData: RequestData[] | null;
}

export interface UserSliceData {
  isLoading: boolean;
  isLoadingPro: boolean;
  isLoadingPwd: boolean;
  isLoadingAuth: boolean;
  errorDri: SerializedError | null;
  errorRid: SerializedError | null;
  errorUse: SerializedError | null;
  errorPro: SerializedError | null;
  errorPwd: SerializedError | null;
  errorAuth: SerializedError | null;
  successDri: boolean;
  successRid: boolean;
  successUse: boolean;
  successPro: boolean;
  successPwd: boolean;
  successAuth: boolean;
  messageDri: string | null;
  messageRid: string | null;
  messageUse: string | null;
  messagePro: string | null;
  messagePwd: string | null;
  messageAuth: string | null;
  statusDri: number | null;
  statusRid: number | null;
  statusUse: number | null;
  statusPro: number | null;
  statusPwd: number | null;
  statusAuth: number | null;
  totalPagesDri: number;
  totalPagesRid: number;
  totalPagesUse: number;
  driverArrData: UserInfo[] | null;
  riderArrData: UserInfo[] | null;
  userArrData: UserInfo[] | null;
  userData: UserInfo | null;
}

export interface MessageSliceData {
  isLoading: boolean;
  errorAll: SerializedError | null;
  errorUser: SerializedError | null;
  errorSing: SerializedError | null;
  errorUpd: SerializedError | null;
  successAll: boolean;
  successUser: boolean;
  successSing: boolean;
  successUpd: boolean;
  messageAll: string | null;
  messageUser: string | null;
  messageSing: string | null;
  messageUpd: string | null;
  statusAll: number | null;
  statusUser: number | null;
  statusSing: number | null;
  statusUpd: number | null;
  totalPages: number;
  msgCount: number | null;
  messageData: MessageData | null;
  messageArrData: MessageData[] | null;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface FileUpload {
  file: File | null;
  isUploaded: boolean;
  img: string | null;
}

export interface CustomRadioProps {
  isLogin: boolean;
}

export type AsideType = { show: boolean; ref: string };

export interface ReqCompProps {
  isAdmin?: boolean;
}
