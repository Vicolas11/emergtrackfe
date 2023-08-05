import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import PageNotFound from "./screen/PageNotFound";
import AdminProfile from "./screen/AdminProfile";
import SendRequest from "./screen/SendRequest";
import AdminLogin from "./screen/AdminLogin";
import Dashboard from "./screen/Dashboard";
import Messages from "./screen/Messages";
import Requests from "./screen/Requests";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Profile from "./screen/Profile";
import Drivers from "./screen/Drivers";
import Signup from "./screen/Signup";
import Riders from "./screen/Riders";
import Login from "./screen/Login";
import Users from "./screen/Users";
import "./styles/index.scss";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/request",
    element: <Dashboard />,
  },
  {
    path: "/admin/driver",
    element: <Drivers />,
  },
  {
    path: "/admin/rider",
    element: <Riders />,
  },
  {
    path: "/admin/user",
    element: <Users />,
  },
  {
    path: "/admin/profile",
    element: <AdminProfile />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/sendrequest",
    element: <SendRequest />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
