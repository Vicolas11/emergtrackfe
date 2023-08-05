import { resetDriData, resetRidData, resetUserData } from "../store/slices/user.slice";
import { setRequestId, showRequestModal } from "../store/slices/general.slice";
import { updateIsReadRequest } from "../actions/requests/updateIsReadRequest";
import { getAllUsersRequest } from "../actions/requests/getAllUserRequests";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { getAllRequest } from "../actions/requests/getAllRequests";
import { resetUpdData } from "../store/slices/request.slice";
import { getAuthUser } from "../actions/users/getAuthUser";
import { fullDateFormat } from "../utils/formatdate.util";
import RequestDetailModal from "./RequestDetailModal";
import styles from "../styles/Requests.module.scss";
import { ReqCompProps } from "../interfaces";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const RequestsComponent = ({ isAdmin = false }: ReqCompProps) => {
  const reqArrData = useAppSelector((state) => state.request.requestArrData);
  const showReqModal = useAppSelector((state) => state.general.showReqModal);
  const isLoading = useAppSelector((state) => state.request.isLoading);
  const totalPgs = useAppSelector((state) => state.request.totalPages);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const successAll = useAppSelector((state) => state.request.successAll);
  const successCan = useAppSelector((state) => state.request.successCan);
  const successAss = useAppSelector((state) => state.request.successAss);
  const successUpd = useAppSelector((state) => state.request.successUpd);
  const successAuth = useAppSelector((state) => state.user.successAuth);
  const successUser = useAppSelector((state) => state.request.successUser);
  const errAll = useAppSelector((state) => state.request.errorAll);
  const errUser = useAppSelector((state) => state.request.errorUser);
  const [currentPg, setCurrentPg] = useState(1);
  const dispatch = useAppDispatch();
  const labels = [
    "User ID",
    "VIN",
    "Plate Number",
    "Brand",
    "Color",
    "Location",
    "DateTime",
    "Status",
  ];

  const tableData = reqArrData
    ? reqArrData.map((req) => {
        return {
          id: `${req.id}`,
          userid: `${req.user?.userId}`,
          vin: `${req.vin}`,
          plate_num: `${req.plate_num}`,
          brand: `${req.brand}`,
          color: `${req.color}`,
          location: `${req.location}`,
          date: `${fullDateFormat(req.date)}`,
          isRead: req.isRead,
          status: `${req.status}`,
        };
      })
    : [];

  const viewModal = (id: string, status: boolean) => {
    dispatch(setRequestId(id));
    dispatch(showRequestModal(true));
    if (!status && role === "Admin") {
      dispatch(updateIsReadRequest(id));
    }
  };

  useEffect(() => {
    if (role === "Admin") {
      dispatch(getAllRequest({ limit: 9, page: currentPg }));
      dispatch(resetUpdData());
    } else {
      dispatch(getAllUsersRequest({ limit: 9, page: currentPg }));
    }

    dispatch(getAuthUser());
  }, [
    dispatch,
    successAll,
    successUser,
    successAss,
    successCan,
    successUpd,
    successAuth,
    currentPg,
    role,
  ]);

  useEffect(() => {
    if (role === "Admin") {
      dispatch(resetUserData());
      dispatch(resetDriData());
      dispatch(resetRidData());
    }
  }, [dispatch, role]);

  const handlePageChange = (page: number) => {
    setCurrentPg(page);
  };

  return (
    <>
      {showReqModal && <RequestDetailModal />}
      <div className={isAdmin ? styles.dashAdminTable : styles.dashTable}>
        {isLoading ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            Request loading, Please Wait...
          </h1>
        ) : errAll || errUser ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            An error occured...
          </h1>
        ) : (
          <>
            {tableData.length === 0 ? (
              <h1 className="text-[#09483D] font-bold text-2xl text-center">
                No Request made Yet!
              </h1>
            ) : (
              <div className="overflow-x-auto relative sm:rounded-lg">
                <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
                  <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                      {labels.map((lbl, i) => (
                        <th
                          key={i.toString()}
                          scope="col"
                          className="py-3 px-2"
                        >
                          <div className="flex items-center">
                            {lbl}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-1 w-3 h-3"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 320 512"
                            >
                              <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                            </svg>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, i) => (
                      <tr
                        key={i.toString()}
                        className={
                          !item.isRead && role === "Admin"
                            ? styles.dashTableTRA
                            : styles.dashTableTR
                        }
                        onClick={() => viewModal(`${item.id}`, item.isRead)}
                      >
                        <td className="py-2 px-2 text-gray-700">
                          {item.userid}
                        </td>
                        <td className="py-2 px-2 text-gray-700">{item.vin}</td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.plate_num}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.brand}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.color}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.location}
                        </td>
                        <td className="py-2 px-2 text-gray-700">{item.date}</td>
                        <td className="py-2 px-2 text-gray-700">
                          <p
                            className={`w-fit py px-1 rounded-md text-gray-100 font-bold ${
                              item.status === "Granted"
                                ? "bg-green-500"
                                : item.status === "Cancelled"
                                ? "bg-red-500"
                                : item.status === "Pending"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {item.status}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {(!errAll || !errUser) && !isLoading && totalPgs > 1 && (
        <Pagination
          totalPages={totalPgs}
          currentPage={currentPg}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RequestsComponent;
