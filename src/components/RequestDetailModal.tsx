import { resetAssData, resetCanData } from "../store/slices/request.slice";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { assignRequest } from "../actions/requests/assignRequest";
import { cancelRequest } from "../actions/requests/cancelRequest";
import { showRequestModal } from "../store/slices/general.slice";
import { getAllDrivers } from "../actions/users/getAllDrivers";
import { getAllRiders } from "../actions/users/getAllRiders";
import { fullDateFormat } from "../utils/formatdate.util";
import styles from "../styles/RequestModal.module.scss";
import { useEffect, useRef, useState } from "react";
import { customStyles } from "../utils/select.util";
import toast, { Toaster } from "react-hot-toast";
import { OptionType } from "../interfaces";
import { MdClose } from "react-icons/md";
import LoadingBtn from "./LoadingBtn";
import BackDrop from "./BackDrop";
import Select from "react-select";

const RequestDetailModal = () => {
  const reqArrData = useAppSelector((state) => state.request.requestArrData);
  const driArrData = useAppSelector((state) => state.user.driverArrData);
  const ridArrData = useAppSelector((state) => state.user.riderArrData);
  const errCan = useAppSelector((state) => state.request.errorCan);
  const isLoadingAss = useAppSelector((state) => state.request.isLoadingAss);
  const successCan = useAppSelector((state) => state.request.successCan);
  const successDri = useAppSelector((state) => state.user.successDri);
  const successRid = useAppSelector((state) => state.user.successRid);
  const staAss = useAppSelector((state) => state.request.statusAss);
  const staCan = useAppSelector((state) => state.request.statusCan);
  const msgAss = useAppSelector((state) => state.request.messageAss);
  const msgCan = useAppSelector((state) => state.request.messageCan);
  const [selectedVal, setSelectedVal] = useState({
    riderEmail: "",
    driverEmail: "",
  });
  const isLoading = useAppSelector((state) => state.request.isLoading);
  const reqId = useAppSelector((state) => state.general.requestId);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const data = reqArrData?.find((item) => item.id === reqId);
  const [isCancel, setIsCancel] = useState(false);
  const dispatch = useAppDispatch();
  // const data = {
  //   id: "63435435345345345",
  //   userid: "EMEG-2342342",
  //   vin: "17ADER74FG09SCG67G",
  //   plate_num: "ABJC78909",
  //   brand: "Volvo",
  //   color: "Blue",
  //   location: "No. 32 Agep Street, Ikorudo, Lagos, Nigeria",
  //   date: "Monday 22nd July, 2023 02:34PM",
  //   status: "Pending",
  //   driver: {
  //     name: "Monday Chuks",
  //     phone: "09067590234",
  //   },
  //   rider: {
  //     name: "Paul Martinz",
  //     phone: "08105629012",
  //   },
  //   info: "Please help out with my vehicle. I'm stuck in a traffic. Please come to my aid. Thanks.",
  // };
  const labelRiderRef = useRef<HTMLLabelElement>(null);
  const labelDriverRef = useRef<HTMLLabelElement>(null);
  const { riderEmail, driverEmail } = selectedVal;
  const driverRef = useRef(null);
  const riderRef = useRef(null);

  const handleRequestCancel = (id: string) => {
    if (id) {
      dispatch(cancelRequest(id));
    }
  };

  const onSelectRiderChange = (option: OptionType | null) => {
    labelRiderRef.current?.classList.add(styles.label_rider_blur);
    if (option) {
      setSelectedVal((prev) => ({
        riderEmail: option.value,
        driverEmail: prev.driverEmail,
      }));
    } else {
      labelRiderRef.current?.classList.remove(styles.label_rider_blur);
      setSelectedVal((prev) => ({
        riderEmail: "",
        driverEmail: prev.driverEmail,
      }));
    }
  };

  const onSelectDriverChange = (option: OptionType | null) => {
    labelDriverRef.current?.classList.add(styles.label_driver_blur);
    if (option) {
      setSelectedVal((prev) => ({
        riderEmail: prev.riderEmail,
        driverEmail: option.value,
      }));
    } else {
      labelDriverRef.current?.classList.remove(styles.label_driver_blur);
      setSelectedVal((prev) => ({
        riderEmail: prev.riderEmail,
        driverEmail: "",
      }));
    }
  };

  const onAssignRequest = () => {
    if (data && data.user) {
      dispatch(
        assignRequest({
          id: data.id,
          driverEmail,
          riderEmail,
          userEmail: data.user.email,
          location: data.location,
          plate_num: data.plate_num,
          color: data.color,
          brand: data.brand,
        })
      );
    }
  };

  const riderOpts = ridArrData
    ? [
        ...ridArrData.map((data) => ({
          value: `${data.email}`,
          label: `${data.firstName} ${data.lastName}`,
        })),
      ]
    : [];

  const driverOpts = driArrData
    ? [
        ...driArrData.map((data) => ({
          value: `${data.email}`,
          label: `${data.firstName} ${data.lastName}`,
        })),
      ]
    : [];

  useEffect(() => {
    if (successCan || errCan) {
      dispatch(resetCanData());
      setIsCancel(false);
      dispatch(showRequestModal(false));
    }
  }, [dispatch, successCan, errCan]);

  useEffect(() => {
    if (role === "Admin") {
      dispatch(getAllDrivers({ limit: 10, page: 1 }));
      dispatch(getAllRiders({ limit: 10, page: 1 }));
    }
  }, [dispatch, successDri, successRid, role]);

  useEffect(() => {
    if (staAss) {
      toast(msgAss, staAss > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetAssData());
    }

    if (staCan) {
      toast(msgCan, staCan > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetCanData());
    }
  }, [msgAss, msgCan, staAss, staCan, dispatch]);

  return (
    <BackDrop>
      <>
        <Toaster />
        <div className={styles.request_modal}>
          <span
            className={styles.icon_exit}
            onClick={() => dispatch(showRequestModal(false))}
          >
            <MdClose size={25} />
          </span>
          <h3>{data?.userId}</h3>
          {isCancel ? (
            <>
              <h2>Are you sure you want to cancel this request?</h2>
              <div className={styles.btn_wrapper}>
                {!isLoading ? (
                  <button
                    className={styles.btn_yes}
                    onClick={() => handleRequestCancel(data?.id as string)}
                  >
                    Yes
                  </button>
                ) : (
                  <LoadingBtn title="loading" styles={styles.btn_yes} />
                )}
                <button
                  className={styles.btn_no}
                  onClick={() => setIsCancel(false)}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.items}>
                <div>
                  <span>Date:</span>
                  <span>{fullDateFormat(data?.date as string)}</span>
                </div>
                <div>
                  <span>VIN:</span>
                  <span>{data?.vin}</span>
                </div>
                <div>
                  <span>Plate Number:</span>
                  <span>{data?.plate_num}</span>
                </div>

                <div>
                  <span>Brand:</span>
                  <span>{data?.brand}</span>
                </div>
                <div>
                  <span>Color:</span>
                  <span>{data?.color}</span>
                </div>
                <div>
                  <span>Location:</span>
                  <span>{data?.location}</span>
                </div>
                <div>
                  <span>Status:</span>
                  <span>{data?.status}</span>
                </div>
                {data?.driver ||
                (role === "Admin" && data?.status !== "Cancelled") ? (
                  <div>
                    <span>Driver:</span>
                    {data?.status !== "Pending" && (
                      <span>
                        {`${data?.driver?.firstName || "None"} ${
                          data?.driver?.lastName || "None"
                        }`}{" "}
                        {`(+${data?.driver?.phone || "None"})`}
                      </span>
                    )}
                    {role === "Admin" && data?.status === "Pending" && (
                      <div className={styles.select_wrapper}>
                        <Select
                          isClearable
                          ref={driverRef}
                          options={driverOpts}
                          placeholder=""
                          isDisabled={driverOpts.length === 0}
                          styles={customStyles()}
                          onChange={onSelectDriverChange}
                        />
                        <label
                          ref={labelDriverRef}
                          className={styles.label_driver}
                        >
                          Select Driver
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {data?.rider ||
                (role === "Admin" && data?.status !== "Cancelled") ? (
                  <div>
                    <span>Rider:</span>
                    {data?.status !== "Pending" && (
                      <span>
                        {`${data?.rider?.firstName || "None"} ${
                          data?.rider?.lastName || "None"
                        }`}{" "}
                        {`(+${data?.rider?.phone || "None"})`}
                      </span>
                    )}
                    {role === "Admin" && data?.status === "Pending" && (
                      <div className={styles.select_wrapper}>
                        <Select
                          isClearable
                          ref={riderRef}
                          options={riderOpts}
                          placeholder=""
                          isDisabled={riderOpts.length === 0}
                          styles={customStyles()}
                          onChange={onSelectRiderChange}
                        />
                        <label
                          ref={labelRiderRef}
                          className={styles.label_rider}
                        >
                          Select Rider
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {data?.info ? (
                  <div>
                    <span>Info:</span>
                    <span>{data?.info}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.btn_wrapper}>
                {role === "Admin" ? (
                  !isLoadingAss ? (
                    <button
                      className={styles.btn_cancel}
                      disabled={
                        data?.status !== "Pending" ||
                        riderEmail === "" ||
                        driverEmail === ""
                      }
                      onClick={onAssignRequest}
                    >
                      Assign
                    </button>
                  ) : (
                    <LoadingBtn title="Assign" styles={styles.btn_cancel} />
                  )
                ) : (
                  <button
                    className={styles.btn_cancel}
                    onClick={() => setIsCancel(true)}
                    disabled={data?.status !== "Pending"}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className={styles.btn_close}
                  onClick={() => dispatch(showRequestModal(false))}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </BackDrop>
  );
};

export default RequestDetailModal;
