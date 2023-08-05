import { useAppSelector } from "../hooks/store.hook";
import DashSideBar from "../components/DashSideBar";
import UserProfile from "../components/UserProfile";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import { useEffect } from "react";

const AdminProfile = () => {
  const role = useAppSelector((state) => state.auth.userData?.role);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) document.title = "Admin | Profile";
  }, [isAuth]);

  if ((!isAuth && role !== "Admin") || !role) {
    navigate("/admin");
    return <AdminLogin />;
  }

  return (
    <>
      <main>
        <DashSideBar />
        <DashHeader title="Admin Profile" />
        <UserProfile isAdmin={true} />
      </main>
    </>
  );
};

export default AdminProfile;