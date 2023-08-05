import RequestsComponent from "../components/RequestsComponent";
import { useAppSelector } from "../hooks/store.hook";
import Navbar from "../components/Navbar";
import { useEffect, memo } from "react";
import Login from "./Login";

const Requests = memo(() => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) document.title = "Request";
  }, [isAuth]);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <RequestsComponent />
    </>
  );
});

export default Requests;
