import UsersComponent from "../components/UsersComponent";
import { useAppSelector } from "../hooks/store.hook";
import DashSideBar from "../components/DashSideBar";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import { useEffect } from "react";

const Users = () => {
  const role = useAppSelector((state) => state.auth.userData?.role);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Users";
  }, []);

  if ((!isAuth && role !== "Admin") || !role) {
    navigate("/admin");
    return <AdminLogin />;
  }

  return (
    <>
      <main>
        <DashSideBar />
        <DashHeader title="Users" />
        <UsersComponent isAdmin={true} />
      </main>
    </>
  );
};

export default Users;
