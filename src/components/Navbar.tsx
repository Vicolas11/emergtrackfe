import { RiArrowDropDownLine, RiMailSendLine, RiUserLine } from "react-icons/ri";
import { resetMessageData, resetUserData } from "../store/slices/message.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetRequestData } from "../store/slices/request.slice";
import { resetData } from "../store/slices/auth.slice";
import { CSSTransition } from "react-transition-group";
import { BsSend, BsSendCheck } from "react-icons/bs";
import animate from "../styles/animate.module.css";
import styles from "../styles/NavBar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import Logout from "./Logout";

const Navbar = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const msgCount = useAppSelector((state) => state.message.msgCount);
  const [active, setActive] = useState(false);
  const nodeRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pathname } = location;
  const link = pathname.split("/")[1];
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/request", { replace: true });
  };

  const logout = () => {
    dispatch(resetData());
    dispatch(resetUserData());
    dispatch(resetMessageData());
    dispatch(resetRequestData());
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_logo} onClick={goHome}>
          <img src="../logo.png" className={styles.logo} alt="Logo" />
          <h5>EmergTrack</h5>
        </div>
        <div className={styles.navbar_link}>
          <ul className={styles.nav_link}>
            {role === "User" && (
              <>
                <li
                  className={link === "sendrequest" ? styles.nav_li_active : ""}
                >
                  <BsSendCheck />
                  <Link to="/sendrequest">Send</Link>
                </li>
                <li className={link === "requests" ? styles.nav_li_active : ""}>
                  <BsSend />
                  <Link to="/requests">Requests</Link>
                </li>
              </>
            )}
            <li
              className={[
                styles.li_mgs,
                link === "messages" ? styles.nav_li_active : "",
              ].join(" ")}
            >
              {msgCount && msgCount > 0 ? (
                <span className={styles.num_of_msgs}>{msgCount}</span>
              ) : (
                ""
              )}
              <RiMailSendLine />
              <Link to="/messages">Messages</Link>{" "}
            </li>
            <li className={link === "profile" ? styles.nav_li_active : ""}>
              <RiUserLine />
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          <div className={styles.avatar_wrapper}>
            <span className={styles.avatar}>
              <div>
                {!userData?.avatar ? (
                  <FaUserCircle className="h-auto w-10 text-gray-400" />
                ) : (
                  <img
                    className="h-10 w-10 rounded-[999px] max-w-none"
                    src={`${userData?.avatar}`}
                    alt="avatar"
                  />
                )}
              </div>
              <div className={styles.profile_name}>
                <h3>{userData?.firstName || "Name"}</h3>
                <RiArrowDropDownLine
                  className={styles.desktop_dropdownline}
                  size={26}
                />
                <RiArrowDropDownLine
                  className={styles.mobile_dropdownline}
                  size={26}
                  onClick={() => setActive((prev) => !prev)}
                />
              </div>
              <Logout />
            </span>
          </div>
        </div>
      </nav>
      {/* Show on Mobile View */}
      <CSSTransition
        nodeRef={nodeRef}
        in={active}
        mountOnEnter
        unmountOnExit
        timeout={400}
        classNames={{
          enterActive: animate.navBarEnterActive,
          exitActive: animate.navBarExitActive,
        }}
      >
        <ul ref={nodeRef} className={styles.nav_link_phone}>
          {role === "User" && (
            <>
              <li
                className={
                  link === "sendrequest" ? styles.nav_mobile_li_active : ""
                }
              >
                <BsSendCheck />
                <Link to="/sendrequest">Send</Link>
              </li>
              <li
                className={
                  link === "requests" ? styles.nav_mobile_li_active : ""
                }
              >
                <BsSend />
                <Link to="/requests">Requests</Link>
              </li>
            </>
          )}
          <li
            className={[
              styles.li_mgs_mobile,
              link === "messages" ? styles.nav_mobile_li_active : "",
            ].join(" ")}
          >
            {msgCount && msgCount > 0 ? (
              <span className={styles.num_of_msgs_mobile}>{msgCount}</span>
            ) : (
              ""
            )}
            <RiMailSendLine />
            <Link to="/messages">Messages</Link>{" "}
          </li>
          <li className={link === "profile" ? styles.nav_mobile_li_active : ""}>
            <RiUserLine />
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={logout} className="cursor-pointer">
            <FiLogOut size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </CSSTransition>
    </>
  );
};

export default Navbar;
