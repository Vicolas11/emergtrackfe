import MessagesComponent from "../components/MessagesComponent";
import { useAppSelector } from "../hooks/store.hook";
import Navbar from "../components/Navbar";
import { useEffect, memo } from "react";
import Login from "./Login";

const Messages = memo(() => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) document.title = "Messages";
  }, [isAuth]);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <MessagesComponent />
    </>
  );
});

export default Messages;
