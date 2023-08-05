import { useAppSelector } from "../hooks/store.hook";
import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import { useEffect, memo } from "react";
import Login from "./Login";

const Profile = memo(() => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) document.title = "Profile";
  }, [isAuth]);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <UserProfile />
    </>
  );
});

export default Profile;
