import { useAppSelector } from "../hooks/store.hook";
import RequestForm from "../components/RequestForm";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { memo, useEffect } from "react";
import Login from "./Login";

const SendRequest = memo(() => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) document.title = "Send Request";
  }, [isAuth]);

  if (!isAuth) {
    navigate("/", { replace: true });
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex mx-auto bg-bgColor2">
        <RequestForm />
      </div>
    </>
  );
});

export default SendRequest;
