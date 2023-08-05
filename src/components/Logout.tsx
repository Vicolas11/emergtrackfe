import { resetMessageData } from "../store/slices/message.slice";
import { resetRequestData } from "../store/slices/request.slice";
import { resetUserData } from "../store/slices/user.slice";
import { resetData } from "../store/slices/auth.slice";
import { useAppDispatch } from "../hooks/store.hook";
import styles from "../styles/NavBar.module.scss";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(resetData());
    dispatch(resetUserData());
    dispatch(resetMessageData());
    dispatch(resetRequestData());
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.desktop_logout} onClick={logout}>
      <FiLogOut size={20} />
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
