import { MdClose, MdOutlineDirectionsBike } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetMessageData } from "../store/slices/message.slice";
import { resetRequestData } from "../store/slices/request.slice";
import { setShowSideBar } from "../store/slices/general.slice";
import { resetUserData } from "../store/slices/user.slice";
import { resetData } from "../store/slices/auth.slice";
import styles from "../styles/Dashboard.module.scss";
import { useAppDispatch } from "../hooks/store.hook";
import { FaPowerOff, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AsideType } from "../interfaces";
import { BsSend } from "react-icons/bs";
import { forwardRef } from "react";
import BackDrop from "./BackDrop";

const Aside = forwardRef<HTMLDivElement, AsideType>(({ show }, ref) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    dispatch(resetData());
    dispatch(resetUserData());
    dispatch(resetMessageData());
    dispatch(resetRequestData());
    navigate("/admin", { replace: true });
  };

  return (
    <BackDrop>
      <aside ref={ref} className={`${show ? "" : "block"}  ${styles.aside}`}>
        <div className="inline-flex justify-between items-center w-full">
          <div className="w-full">
            <Link to="/" className="inline-flex items-center p-2 mr-4">
              <img
                src="../Logo White.png"
                className="mr-2 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="text-xl lit:text-sm text-white font-bold tracking-wide">
                EmergTrack
              </span>
            </Link>
          </div>
          <div
            className="text-end"
            onClick={() => dispatch(setShowSideBar(false))}
          >
            <MdClose className="p-0 m-0 lit:text-2xl text-3xl mr-2" />
          </div>
        </div>
        <div
          className={styles.sideBarBtnWrapper}
          onClick={() => {
            dispatch(setShowSideBar(false));
          }}
        >
          <Link
            to="/admin/request"
            className={[
              styles.sideBarBtn,
              pathname === "/admin/request" ? styles.active : "",
            ].join(" ")}
          >
            <BsSend size={"1.2rem"} />
            <span>Requests</span>
          </Link>
          <Link
            to="/admin/user"
            className={[
              styles.sideBarBtn,
              pathname === "/admin/user" ? styles.active : "",
            ].join(" ")}
          >
            <FaUsers size={"1.7rem"} />
            <span>Users</span>
          </Link>
          <Link
            to="/admin/rider"
            className={[
              styles.sideBarBtn,
              pathname === "/admin/rider" ? styles.active : "",
            ].join(" ")}
          >
            <MdOutlineDirectionsBike size={"1.7rem"} />
            <span>Riders</span>
          </Link>
          <Link
            to="/admin/driver"
            className={[
              styles.sideBarBtn,
              pathname === "/admin/driver" ? styles.active : "",
            ].join(" ")}
          >
            <img
              src="../driver.png"
              alt="driver icon"
              className="lit:w-6 w-6"
            />
            <img
              src="../driver_white.png"
              alt="driver icon"
              className="lit:w-6 w-6"
            />
            <img
              src="../driver_yellow.png"
              alt="driver icon"
              className="lit:w-6 w-6"
            />
            <span>Drivers</span>
          </Link>
          <Link
            to="/admin/profile"
            className={[
              styles.sideBarBtn,
              pathname === "/admin/profile" ? styles.active : "",
            ].join(" ")}
          >
            <CgProfile size={"1.7rem"} />
            <span>Profile</span>
          </Link>
          <button className={styles.sideBarBtn} onClick={logout}>
            <FaPowerOff size={"1.5rem"} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </BackDrop>
  );
});

Aside.displayName = "Aside";

export default Aside;
