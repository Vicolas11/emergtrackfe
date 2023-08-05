import { errorToastStyle, successToastStyle, warnToastStyle } from "../utils/styles.utils";
import { updateUserPassword } from "../actions/users/updateUserPassword";
import { resetProData, resetUserData } from "../store/slices/user.slice";
import { updateUserProfile } from "../actions/users/updateUserProfile";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { resetMessageData } from "../store/slices/message.slice";
import { resetRequestData } from "../store/slices/request.slice";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { getAuthUser } from "../actions/users/getAuthUser";
import { uploadToCloudinary } from "../utils/cloudUpload";
import { FileUpload, ReqCompProps } from "../interfaces";
import { useCallback, useEffect, useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { resetData } from "../store/slices/auth.slice";
import { titleCase } from "../utils/titlecase.util";
import styles from "../styles/Profile.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import LoadingBtn from "./LoadingBtn";
import _ from "lodash";

const UserProfile = ({ isAdmin = false }: ReqCompProps) => {
  const user = useAppSelector((state) => state.user.userData);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const isLoadingPro = useAppSelector((state) => state.user.isLoadingPro);
  const isLoadingPwd = useAppSelector((state) => state.user.isLoadingPwd);
  const successPro = useAppSelector((state) => state.user.successPro);
  const successPwd = useAppSelector((state) => state.user.successPwd);
  const successAuth = useAppSelector((state) => state.user.successAuth);
  const errPro = useAppSelector((state) => state.user.errorPro);
  const [showPwd, setShowPwd] = useState<boolean>(true);
  const [showPwdII, setShowPwdII] = useState<boolean>(true);
  const errPwd = useAppSelector((state) => state.user.errorPwd);
  const msgPro = useAppSelector((state) => state.user.messagePro);
  const staPro = useAppSelector((state) => state.user.statusPro);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  let data = {
    firstName: user?.firstName || "Vicolas",
    lastName: user?.lastName || "Akoh",
    avatar: user?.avatar,
    email: user?.email || "akohvictor1@gmail.com",
    phone: user?.phone || "2348107874622",
    username: user?.username || "Vicolas11",
    userID: user?.userId || "EMERG2342323",
  };

  const [isValidInput, setIsValidInput] = useState({
    fNameValid: false,
    lNameValid: false,
    phoneValid: false,
    userValid: false,
  });

  const { phoneValid } = isValidInput;

  // console.log("TOKEN SUP +++. ", token)
  const [textInput, setTextInput] = useState({
    name: {
      firstName: `${data?.firstName}`,
      lastName: `${data?.lastName}`,
    },
    email: `${data?.email}`,
    phone: `${data?.phone}`,
    username: `${data?.username}`,
    userID: `${data?.userID}`,
  });

  const [passwordInput, setPasswordInput] = useState({
    old_psd: "",
    new_psd: "",
  });

  const [selectedFile, setSelectedFile] = useState<FileUpload>({
    file: null,
    isUploaded: false,
    img: null,
  });

  const { name, username, phone } = textInput;
  const { firstName, lastName } = name;
  const { old_psd, new_psd } = passwordInput;

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(resetData());
    dispatch(resetUserData());
    dispatch(resetMessageData());
    dispatch(resetRequestData());
    navigate(role === "Admin" ? "/admin" : "/", { replace: true });
  }, [dispatch, navigate, role]);

  const onChangeFirstName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: evt.target.value,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      username: prev.username,
      userID: prev.userID,
    }));
  };

  const onChangeLastName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: evt.target.value,
      },
      email: prev.email,
      phone: prev.phone,
      username: prev.username,
      userID: prev.userID,
    }));
  };

  const onChangePhone = (value: string, country: any) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: value,
      username: prev.username,
      userID: prev.userID,
    }));

    // Validate the phone number
    let isValid = isValidPhoneNumber(value, country.countryCode.toUpperCase());
    if (country.countryCode === "ng") {
      const ngPhoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
      isValid = ngPhoneRegex.test(value);
    }

    setIsValidInput((prev) => ({
      fNameValid: prev.fNameValid,
      lNameValid: prev.lNameValid,
      phoneValid: !isValid,
      userValid: prev.userValid,
    }));
  };

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      username: evt.target.value,
      userID: prev.userID,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const mainFile = evt.target.files;

    if (mainFile) {
      if (mainFile.length !== 0) {
        setSelectedFile({
          file: mainFile[0],
          isUploaded: true,
          img: URL.createObjectURL(mainFile[0]),
        });
      }
    }
  };

  const resetImage = () => {
    setSelectedFile((prev) => ({
      file: null,
      isUploaded: false,
      img: null,
    }));
  };

  const onChangeCurPsd = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput((prev) => ({
      old_psd: evt.target.value,
      new_psd: prev.new_psd,
    }));
  };

  const onChangeNewPsd = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput((prev) => ({
      old_psd: prev.old_psd,
      new_psd: evt.target.value,
    }));
  };

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let payload = {};

    if (selectedFile.file) {
      setIsUploading(true);
      const { file } = selectedFile;

      try {
        const imgUrl = await uploadToCloudinary(file);
        if (imgUrl && imgUrl !== "") {
          payload = { ...payload, avatar: imgUrl };
          setIsUploading(false);
        }
      } catch (err) {
        setIsUploading(false);
        const error: any = err;
        if (
          error?.status === 100 ||
          error?.status === 101 ||
          error?.status === 102
        ) {
          toast.error(error?.msg, warnToastStyle);
          return;
        }
        toast.error(`${err}`, errorToastStyle);
      }
      resetImage();
    }

    if (user?.firstName !== titleCase(firstName)) {
      payload = { ...payload, firstName };
    }

    if (user?.lastName !== titleCase(lastName)) {
      payload = { ...payload, lastName };
    }

    if (user?.username !== username) {
      payload = { ...payload, username };
    }

    if (user?.phone !== phone) {
      payload = { ...payload, phone };
    }

    if (!_.isEqual(payload, {})) {
      dispatch(updateUserProfile(payload));
      payload = {};
    }
  };

  const onSubmitPsdHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(
      updateUserPassword({ oldpassword: old_psd, newpassword: new_psd })
    );

    setPasswordInput({ old_psd: "", new_psd: "" });
  };

  useEffect(() => {
    if (staPro) {
      toast(msgPro, staPro > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetProData());
    }
  }, [msgPro, staPro, dispatch]);

  useEffect(() => {
    dispatch(getAuthUser());

    if (successPwd) {
      logout();
      return;
    }
  }, [logout, dispatch, successPro, successPwd, successAuth]);

  const isDisabled =
    firstName !== "" && lastName !== "" && username !== "" && !phoneValid;

  const isDisabledPsd = old_psd !== "" && new_psd && new_psd.length >= 6;

  return (
    <div className={isAdmin ? styles.admin_profile : styles.profiles}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.userProfile}>
        <h1>{role} Profile</h1>
        <div className={styles.userImg}>
          <img
            src={
              selectedFile.img
                ? selectedFile.img
                : data?.avatar
                ? data?.avatar
                : "../thumbnail.png"
            }
            alt="passport"
          />
          <div>
            <h1>{`${data?.firstName} ${data?.lastName}`}</h1>
            <h2>{`${data?.email}`}</h2>
            <div className="flex items-center justify-between my-3 space-x-3">
              <div
                className={[
                  styles.uploadAvatarBtn,
                  selectedFile.isUploaded ? styles.fileUpload : "",
                ].join(" ")}
              >
                <label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={onFileUpload}
                  />
                  {selectedFile.isUploaded ? "File Uploaded" : "Change Image"}
                </label>
              </div>
              <button
                className={
                  selectedFile.isUploaded
                    ? styles.btn_reset
                    : styles.uploadAvatarBtn
                }
                onClick={resetImage}
              >
                Reset Image
              </button>
            </div>
          </div>
        </div>

        <form className="mt-4" onSubmit={onSubmitHandler}>
          <div className={styles.row_wrapper}>
            {/* FIRST NAME */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_fname} htmlFor="fname">
                FIRST NAME
              </label>
              <input
                className={styles.fname}
                id="fname"
                type="text"
                value={textInput.name.firstName}
                onChange={onChangeFirstName}
                required
              />
            </div>
            {/* LAST NAME */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_lname} htmlFor="lname">
                LAST NAME
              </label>
              <input
                className={styles.lname}
                id="lname"
                type="text"
                value={textInput.name.lastName}
                onChange={onChangeLastName}
                required
              />
            </div>
          </div>

          <div className={styles.row_wrapper}>
            {/* EMAIL */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_email} htmlFor="email">
                EMAIL
              </label>
              <input
                className={styles.email}
                id="email"
                type="text"
                value={textInput.email}
                readOnly
              />
            </div>
            {/* PHONE NUMBER */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_phone_num} htmlFor="phone_num">
                PHONE NUMBER
              </label>
              <PhoneInput
                country={"ng"}
                value={textInput.phone}
                masks={{ ng: "... ... ...." }}
                onChange={onChangePhone}
                inputStyle={{ border: "none" }}
                containerStyle={{
                  marginTop: "0",
                  marginLeft: ".3rem",
                  paddingTop: "0",
                }}
                buttonStyle={{
                  border: "none",
                  marginTop: "0",
                  background: "none",
                }}
                autoFormat
                countryCodeEditable={false}
                inputProps={{
                  name: "phone",
                  className: `${
                    phoneValid ? styles.input_err_phone : styles.input_phone
                  }`,
                  required: true,
                }}
              />
            </div>
          </div>

          <div className={styles.row_wrapper}>
            {/* USERNAME */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_username} htmlFor="username">
                USERNAME
              </label>
              <input
                className={styles.username}
                id="username"
                type="text"
                value={textInput.username}
                onChange={onChangeUsername}
                required
              />
            </div>
            {/* USER ID */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_userID} htmlFor="userID">
                USER ID
              </label>
              <input
                className={styles.userID}
                id="userID"
                type="text"
                value={textInput.userID}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center p-0 mb-4">
            {!errPro ? (
              !isUploading && !isLoadingPro ? (
                <button className={styles.btn_save} disabled={!isDisabled}>
                  Save Changes
                </button>
              ) : (
                <LoadingBtn title="Saving..." styles={styles.btn_save} />
              )
            ) : (
              <h3 className="font-bold">An error occurred!</h3>
            )}
          </div>
        </form>

        <form className="mt-4" onSubmit={onSubmitPsdHandler}>
          <h1 className="mb-4">Change Password</h1>
          <div className={styles.row_wrapper}>
            {/* CURRENT PASSWORD */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_fname} htmlFor="cur_psd">
                CURRENT PASSWORD
              </label>
              <input
                className={styles.fname}
                id="cur_psd"
                type={showPwd ? "password" : "text"}
                value={old_psd}
                onChange={onChangeCurPsd}
                required
              />
              {showPwd ? (
                <label htmlFor="cur_psd" className={styles.label_lock}>
                  <AiOutlineLock
                    className={styles.icon_lock}
                    size={20}
                    onClick={() => setShowPwd((prev) => !prev)}
                  />
                </label>
              ) : (
                <label htmlFor="cur_psd" className={styles.label_unlock}>
                  <AiOutlineUnlock
                    className={styles.icon_unlock}
                    size={20}
                    onClick={() => setShowPwd((prev) => !prev)}
                  />
                </label>
              )}
            </div>
            {/* NEW PASSWORD*/}
            <div className={styles.input_wrapper}>
              <label className={styles.label_lname} htmlFor="new_psd">
                NEW PASSWORD
              </label>
              <input
                className={styles.lname}
                id="new_psd"
                type={showPwdII ? "password" : "text"}
                value={new_psd}
                onChange={onChangeNewPsd}
                required
              />
              {showPwd ? (
                <label htmlFor="new_psd" className={styles.label_lock}>
                  <AiOutlineLock
                    className={styles.icon_lock}
                    size={20}
                    onClick={() => setShowPwdII((prev) => !prev)}
                  />
                </label>
              ) : (
                <label htmlFor="new_psd" className={styles.label_unlock}>
                  <AiOutlineUnlock
                    className={styles.icon_unlock}
                    size={20}
                    onClick={() => setShowPwdII((prev) => !prev)}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-center p-0 mb-4">
            {!errPwd ? (
              !isLoadingPwd ? (
                <button className={styles.btn_save} disabled={!isDisabledPsd}>
                  Update Password
                </button>
              ) : (
                <LoadingBtn title="Updating..." styles={styles.btn_save} />
              )
            ) : (
              <h3 className="font-bold">An error occurred!</h3>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
