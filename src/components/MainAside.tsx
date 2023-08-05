import { resetMessageData } from "../store/slices/message.slice";
import { resetRequestData } from "../store/slices/request.slice";
import { useNavigate, useLocation } from "react-router-dom";
import { resetUserData } from "../store/slices/user.slice";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { resetData } from "../store/slices/auth.slice";
import styles from "../styles/Dashboard.module.scss";
import { FaPowerOff, FaUsers } from "react-icons/fa";
import { useAppDispatch } from "../hooks/store.hook";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsSend } from "react-icons/bs";

const MainAside = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const logout = () => {
    dispatch(resetData());
    dispatch(resetUserData());
    dispatch(resetMessageData());
    dispatch(resetRequestData());
    navigate("/admin", { replace: true });
  };

  return (
    <aside className={styles.main_aside}>
      <div>
        <Link to="/" className="inline-flex items-center p-2 mr-4">
          <img src="../Logo White.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="font-bold text-lg">EmergTrack</span>
        </Link>
      </div>
      <div className={styles.sideBarBtnWrapper}>
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
          <img src="../driver.png" alt="driver icon" className="lit:w-6 w-6" />
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
        <button className={styles.btnSideBar} onClick={logout}>
          <FaPowerOff size={"1.5rem"} /> <span className="mr-2">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default MainAside;
