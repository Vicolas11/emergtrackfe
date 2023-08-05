import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { resetLogData, resetRegData } from "../store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { loginAdmin } from "../actions/authentication/loginAdmin";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import styles from "../styles/AdminLogin.module.scss";
import LoadingBtn from "../components/LoadingBtn";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const selectedOpt = useAppSelector((state) => state.general.selectedOpt);
  const msgReg = useAppSelector((state) => state.auth.messageReg);
  const statusReg = useAppSelector((state) => state.auth.statusReg);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const success = useAppSelector((state) => state.auth.success);
  const message = useAppSelector((state) => state.auth.message);
  const status = useAppSelector((state) => state.auth.status);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [showPwd, setShowPwd] = useState<boolean>(true);
  const labelPwdRef = useRef<HTMLLabelElement>(null);
  const labelEmailRef = useRef<HTMLLabelElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    emailInput: "",
    passwordInput: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    email: false,
  });
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelEmailRef.current?.classList.add(styles.label_email_blur);

    setInputValue((prev) => ({
      emailInput: value,
      passwordInput: prev.passwordInput,
    }));

    if (value.length >= 1) {
      setIsValidInput(() => ({
        email: !emailRegex.test(value),
      }));
    }
  };

  const handleInputPwdOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelPwdRef.current?.classList.add(styles.label_pwd_blur);

    setInputValue((prev) => ({
      emailInput: prev.emailInput,
      passwordInput: value,
    }));
  };

  const handleOnChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked);
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    //For Input Email
    const handleInputBlur = () => {
      if (labelEmailRef.current && inputEmailRef.current) {
        labelEmailRef.current.classList.add(styles.label_email_blur);
        const value = inputEmailRef.current.value;

        if (value.length >= 1) {
          setIsValidInput(() => ({
            email: !emailRegex.test(value),
          }));
        }

        if (value.length === 0) {
          labelEmailRef.current.classList.remove(styles.label_email_blur);
          setIsValidInput(() => ({
            email: false,
          }));
        }
      }
    };

    // For Input Password
    const handleInputPwdBlur = () => {
      if (labelPwdRef.current && inputPwdRef.current) {
        labelPwdRef.current.classList.add(styles.label_pwd_blur);

        if (inputPwdRef.current.value.length === 0) {
          labelPwdRef.current.classList.remove(styles.label_pwd_blur);
        }
      }
    };

    const inputEmail = document.querySelector("#email");
    inputEmail?.addEventListener("blur", handleInputBlur);

    const inputPwd = document.querySelector("#password");
    inputPwd?.addEventListener("blur", handleInputPwdBlur);

    return () => {
      inputEmail?.removeEventListener("blur", handleInputBlur);
      inputPwd?.removeEventListener("blur", handleInputPwdBlur);
    };
  }, [emailRegex, selectedOpt, isValidInput]);

  const { email } = isValidInput;
  const { emailInput, passwordInput } = inputValue;
  const isDisabled = emailInput !== "" && !email && passwordInput !== "";

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(loginAdmin({ email: emailInput, password: passwordInput }));

    return;
  };

  useEffect(() => {
    if (status) {
      toast(message, status > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetLogData());
    }

    if (statusReg) {
      toast(msgReg, statusReg > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetRegData());
    }

    if (success && isAuth) {
      navigate("/admin/request");
    }
  }, [dispatch, navigate, success, isAuth, message, status, statusReg, msgReg]);

  return (
    <>
      <Toaster />
      <div className={styles.logo}>
        <Link to="/">
          <img src="../logo.png" alt="logo" />
          <h5>EmergTrack</h5>
        </Link>
      </div>
      <div className={styles.login}>
        <form className={styles.form_login}>
          <div className={styles.img_container}>
            <img src="../logo.png" alt="logo" />
          </div>
          <h2>Hello Again!</h2>
          <p className={styles.are_you}>
            Welcome back! Enter your login details.
          </p>
          <div
            className={
              email ? styles.input_container_err : styles.input_container
            }
          >
            <input
              type="email"
              name="email"
              id="email"
              ref={inputEmailRef}
              value={emailInput}
              onChange={handleInputOnChange}
              className={email ? styles.input_err : styles.input_email}
              required
            />
            <label
              ref={labelEmailRef}
              htmlFor="email"
              style={{ color: email ? "#DC2626" : "" }}
              className={styles.label_email}
            >
              Email
            </label>
          </div>
          {email && <p className={styles.err_msg}>Invalid Email address</p>}
          <div className={styles.input_container}>
            <input
              type={showPwd ? "password" : "text"}
              name="password"
              id="password"
              ref={inputPwdRef}
              className={styles.input_pwd}
              value={passwordInput}
              onChange={handleInputPwdOnChange}
              required
            />
            <label
              ref={labelPwdRef}
              htmlFor="password"
              className={styles.label_pwd}
            >
              Password
            </label>
            {showPwd ? (
              <label htmlFor="password" className={styles.label_lock}>
                <AiOutlineLock
                  className={styles.icon_lock}
                  size={20}
                  onClick={() => setShowPwd((prev) => !prev)}
                />
              </label>
            ) : (
              <label htmlFor="password" className={styles.label_unlock}>
                <AiOutlineUnlock
                  className={styles.icon_unlock}
                  size={20}
                  onClick={() => setShowPwd((prev) => !prev)}
                />
              </label>
            )}
          </div>
          <div className={styles.readme}>
            <div>
              <div className={styles.check_wrapper}>
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className={styles.checkBox}
                  checked={isChecked}
                  onChange={handleOnChecked}
                />
                <label htmlFor="remember" className={styles.check_icon_label}>
                  <FaCheck
                    className={styles.check_icon}
                    color={isChecked ? "white" : ""}
                  />
                </label>
              </div>
              <div className="ml-1 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-400">
                  Remember me
                </label>
              </div>
            </div>
            <a className={styles.RecoveryPwd} href="/forgot-password/">
              Recovery Password?
            </a>
          </div>
          {!isLoading ? (
            <button
              className={styles.btn_login}
              onClick={handleSubmit}
              disabled={!isDisabled}
            >
              Login
            </button>
          ) : (
            <LoadingBtn title="Logining..." styles={styles.btn_login} />
          )}
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
