import { setIsNext, setSelectedOpt } from "../store/slices/general.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { MdOutlineDirectionsBike } from "react-icons/md";
import styles from "../styles/Login.module.scss";
import { CustomRadioProps } from "../interfaces";
import { FaRegUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ChangeEvent } from "react";

const CustomRadio = ({ isLogin }: CustomRadioProps) => {
  const selectedOpt = useAppSelector((state) => state.general.selectedOpt);
  const dispatch = useAppDispatch();

  const handleOptionChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setSelectedOpt(value));
  };

  const isDisabled =
    selectedOpt !== "opt1" && selectedOpt !== "opt2" && selectedOpt !== "opt3";

  return (
    <>
      <div className={styles.custom_radio}>
        <label
          htmlFor="opt1"
          className={
            selectedOpt === "opt1"
              ? styles.cust_radio_lbl_active
              : styles.cust_radio_lbl
          }
        >
          <FaRegUser color="#5721B7" size={25} />
          <div className={styles.label_text}>
            <h3>User</h3>
            <p>{`Select this option ${
              isLogin ? "if you are a client!" : "to signup as a client!"
            }`}</p>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id="opt1"
              name="radio-options"
              value="opt1"
              className={styles.checkBox}
              checked={selectedOpt === "opt1"}
              onChange={handleOptionChange}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectedOpt === "opt1" ? "white" : ""}
            />
          </div>
        </label>
        <label
          htmlFor="opt2"
          className={
            selectedOpt === "opt2"
              ? styles.cust_radio_lbl_active
              : styles.cust_radio_lbl
          }
        >
          <MdOutlineDirectionsBike color="#5721B7" size={30} />
          <div className={styles.label_text}>
            <h3>Rider</h3>
            <p>{`Select this option ${
              isLogin ? "if you are a rider!" : "to signup as a rider!"
            }`}</p>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id="opt2"
              name="radio-options"
              value="opt2"
              className={styles.checkBox}
              checked={selectedOpt === "opt2"}
              onChange={handleOptionChange}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectedOpt === "opt2" ? "white" : ""}
            />
          </div>
        </label>
        <label
          htmlFor="opt3"
          className={
            selectedOpt === "opt3"
              ? styles.cust_radio_lbl_active
              : styles.cust_radio_lbl
          }
        >
          <img src="./driver.png" alt="driver icon" className="lit:w-6 w-8" />
          <div className={styles.label_text}>
            <h3>Driver</h3>
            <p>{`Select this option ${
              isLogin ? "if you are a driver!" : "to signup as a driver!"
            }`}</p>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id="opt3"
              name="radio-options"
              value="opt3"
              className={styles.checkBox}
              checked={selectedOpt === "opt3"}
              onChange={handleOptionChange}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectedOpt === "opt3" ? "white" : ""}
            />
          </div>
        </label>
      </div>
      <button
        className={styles.btn_login}
        disabled={isDisabled}
        onClick={() => dispatch(setIsNext(true))}
      >
        Continue
      </button>
    </>
  );
};

export default CustomRadio;
