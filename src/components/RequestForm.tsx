import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { getAllUserMessages } from "../actions/messages/getAllUserMessages";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { showMessageModal } from "../store/slices/general.slice";
import { sendRequest } from "../actions/requests/sendRequest";
import { resetSenData } from "../store/slices/request.slice";
import { getAuthUser } from "../actions/users/getAuthUser";
import styles from "../styles/SendRequest.module.scss";
import { customStyles } from "../utils/select.util";
import { colorOpts } from "../utils/colors.utils";
import toast, { Toaster } from "react-hot-toast";
import { carOpts } from "../utils/car.utils";
import { OptionType } from "../interfaces";
import { BsSend } from "react-icons/bs";
import LoadingBtn from "./LoadingBtn";
import Select from "react-select";

const RequestForm = () => {
  const [selectedVal, setSelectedVal] = useState({ color: "", brand: "" });
  const [inputVal, setInputVal] = useState({
    vin: "",
    plate_num: "",
    location: "",
    info: "",
  });
  const isLoading = useAppSelector((state) => state.request.isLoading);
  const staSen = useAppSelector((state) => state.request.statusSen);
  const msgSen = useAppSelector((state) => state.request.messageSen);
  const successUser = useAppSelector((state) => state.message.successUser);
  const successAuth = useAppSelector((state) => state.user.successAuth);
  const [isValid, setIsValid] = useState({
    isValidFrom: false,
    isValidTo: false,
  });
  const labelColorRef = useRef<HTMLLabelElement>(null);
  const labelBrandRef = useRef<HTMLLabelElement>(null);
  const dispatch = useAppDispatch();
  const selectColorRef = useRef(null);
  const selectBrandRef = useRef(null);
  const { color, brand } = selectedVal;
  const { isValidFrom, isValidTo } = isValid;
  const { vin, plate_num, location, info } = inputVal;

  const onSelectColorChange = (option: OptionType | null) => {
    labelColorRef.current?.classList.add(styles.label_color_blur);
    if (option) {
      setSelectedVal((prev) => ({ color: option.value, brand: prev.brand }));
    } else {
      labelColorRef.current?.classList.remove(styles.label_color_blur);
      setSelectedVal((prev) => ({ color: "", brand: prev.brand }));
      setIsValid((prev) => ({
        isValidFrom: false,
        isValidTo: prev.isValidTo,
      }));
    }
  };

  const onSelectBrandChange = (option: OptionType | null) => {
    labelBrandRef.current?.classList.add(styles.label_brand_blur);
    if (option) {
      setSelectedVal((prev) => ({ color: prev.color, brand: option.value }));
    } else {
      labelBrandRef.current?.classList.remove(styles.label_brand_blur);
      setSelectedVal((prev) => ({ color: prev.color, brand: "" }));
      setIsValid((prev) => ({
        isValidFrom: prev.isValidFrom,
        isValidTo: false,
      }));
    }
  };

  const onInputVINChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (value.length > 17) {
      return;
    }
    setInputVal((prev) => ({
      vin: value,
      plate_num: prev.plate_num,
      location: prev.location,
      info: prev.info,
    }));
  };

  const onInputPlateNumChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputVal((prev) => ({
      vin: prev.vin,
      plate_num: value,
      location: prev.location,
      info: prev.info,
    }));
  };

  const onInputLocationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputVal((prev) => ({
      vin: prev.vin,
      plate_num: prev.plate_num,
      location: value,
      info: prev.info,
    }));
  };

  const onInputInfoChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;
    setInputVal((prev) => ({
      vin: prev.vin,
      plate_num: prev.plate_num,
      location: prev.location,
      info: value,
    }));
  };

  const getLocationInfo = (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInputVal((prev) => ({
          vin: prev.vin,
          plate_num: prev.plate_num,
          location: data.display_name,
          info: prev.info,
        }));
      })
      .catch((e) => console.log("An error occurred in fetching! ", e));
  };

  const success = useCallback((pos: any) => {
    var crd = pos.coords;
    getLocationInfo(crd.latitude, crd.longitude);
  }, []);

  useEffect(() => {
    dispatch(showMessageModal(false));
  }, [dispatch]);

  const errors = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [success]);

  useEffect(() => {
    if (staSen && msgSen) {
      toast(msgSen, staSen > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetSenData());
    }
  }, [dispatch, msgSen, staSen]);

  useEffect(() => {
    dispatch(getAllUserMessages({limit: 9, page: 1}));
    dispatch(getAuthUser());
  }, [dispatch, successUser, successAuth]);

  const isDisabled =
    !isValidFrom &&
    !isValidTo &&
    color &&
    brand &&
    vin.length === 17 &&
    vin &&
    plate_num !== "" &&
    plate_num &&
    location !== "" &&
    location;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    let payload: any = { plate_num, brand, vin, color, location };
    if (info && info !== "") {
      payload = { ...payload, info };
    }
    dispatch(sendRequest(payload));
    // Reset
    setSelectedVal({ color: "", brand: "" });
    setInputVal({
      vin: "",
      plate_num: "",
      location: "",
      info: "",
    });    
  };

  return (
    <>
    <Toaster />
    <div className={styles.request}>
      <form>
        <h2>Make an Emergency Request</h2>
        <div className={styles.request_div}>
          <div className="w-full space-y-2">
            {/* VIN */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_vin} htmlFor="vin">
                Vehicle Identification Number
              </label>
              <input
                className={styles.vin}
                id="vin"
                type="text"
                value={vin}
                onChange={onInputVINChange}
              />
            </div>
            {/* PLATE NUMBER */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_num} htmlFor="plate_num">
                Plate Number
              </label>
              <input
                className={styles.plate_num}
                id="plate_num"
                type="text"
                value={plate_num}
                onChange={onInputPlateNumChange}
              />
            </div>
            {/* COLOR */}
            <div>
              <div className={styles.select_wrapper}>
                <Select
                  isClearable
                  ref={selectColorRef}
                  options={colorOpts}
                  placeholder=""
                  styles={customStyles()}
                  onChange={onSelectColorChange}
                />
                <label ref={labelColorRef} className={styles.label_color}>
                  Car Colour
                </label>
              </div>
            </div>
            {/* BRAND */}
            <div>
              <div className={styles.select_wrapper}>
                <Select
                  isClearable
                  ref={selectBrandRef}
                  options={carOpts}
                  placeholder=""
                  styles={customStyles()}
                  onChange={onSelectBrandChange}
                />
                <label ref={labelBrandRef} className={styles.label_brand}>
                  Car Brand
                </label>
              </div>
            </div>
          </div>
          <div className="w-full space-y-2">
            {/* LOCATION */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_location} htmlFor="location">
                Car Location
              </label>
              <input
                className={styles.location}
                id="location"
                type="text"
                value={location}
                onChange={onInputLocationChange}
              />
            </div>
            {/* ADDITIONAL INFO */}
            <div className={styles.input_wrapper}>
              <label className={styles.label_info} htmlFor="info">
                Additional Info
              </label>
              <textarea
                className={styles.info}
                id="info"
                rows={5}
                value={info}
                onChange={onInputInfoChange}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Request BTN */}
        <div className={styles.btn_request_wrapper}>
          {!isLoading ? (
            <button
              className={styles.btn_request}
              onClick={handleSubmit}
              disabled={!isDisabled}
            >
              <BsSend />
              <span>Send Request</span>
            </button>
          ) : (
            <LoadingBtn title="Request..." styles={styles.btn_request} />
          )}
        </div>
      </form>
    </div>
    </>
    
  );
};

export default RequestForm;
