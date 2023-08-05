import { setShowSideBar } from "../store/slices/general.slice";
import styles from "../styles/Dashboard.module.scss";
import { useAppDispatch } from "../hooks/store.hook";
import { useAppSelector } from "../hooks/store.hook";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";

const DashHeader = ({ title }: { title: string }) => {
  const reqCount = useAppSelector((state) => state.request.reqCount);
  const admin = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className={styles.dashHeader}>
      <div>
        <HiMenuAlt2
          size={"1.5rem"}
          className="mr-[-5px] cursor-pointer lg:hidden"
          onClick={() => dispatch(setShowSideBar(true))}
        />
        <h1>{title}</h1>
      </div>
      <div>
        <span className="relative">
          {reqCount && reqCount > 0 ? (
            <span className={styles.num_of_msgs}>{reqCount}</span>
          ) : (
            ""
          )}
          <FaRegBell size={"1.3rem"} onClick={() => navigate("/admin/request")} />
        </span>
        <span>
          <Link to="/admin/profile">
            <RiUserSettingsLine size={"1.3rem"} />
          </Link>
        </span>
        <span className={styles.username}>
          <div>
            <h3>{admin?.firstName}</h3>
            <p>admin</p>
          </div>
          <img
            src={admin?.avatar ? admin.avatar : "../thumbnail.png"}
            alt="passport"
            className={styles.displayPic}
          />
        </span>
      </div>
    </header>
  );
};

export default DashHeader;
