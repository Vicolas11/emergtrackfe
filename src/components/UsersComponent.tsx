import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { getAllUsers } from "../actions/users/getAllUsers";
import { fullDateFormat } from "../utils/formatdate.util";
import styles from "../styles/Requests.module.scss";
import { ReqCompProps } from "../interfaces";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const UsersComponent = ({ isAdmin = false }: ReqCompProps) => {
  const userArrData = useAppSelector((state) => state.user.userArrData);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const totalPgs = useAppSelector((state) => state.user.totalPagesUse);
  const successUse = useAppSelector((state) => state.user.successUse);
  const errUse = useAppSelector((state) => state.user.errorUse);
  const [currentPg, setCurrentPg] = useState(1);
  const dispatch = useAppDispatch();
  const labels = [
    "UserId",
    "First Name",
    "Last Name",
    "Email",
    "Username",
    "Phone Number",
    "Date Joined",
  ];

  const tableData = userArrData
    ? userArrData.map((data) => {
        return {
          id: data.id,
          firstname: data.firstName || "Monday",
          lastname: data.lastName || "Bulus",
          email: data.email || "mondaybulus@gmail.com",
          phone_num: data.phone || "08106345679",
          username: data.username || "Monddy",
          userid: data.userId || "EMERG-23456D",
          date: fullDateFormat(data.createAt),
        };
      })
    : [];

  useEffect(() => {
    dispatch(getAllUsers({ limit: 9, page: currentPg }));
  }, [dispatch, successUse, currentPg]);

  const handlePageChange = (page: number) => {
    setCurrentPg(page);
  };

  return (
    <>
      <div className={isAdmin ? styles.dashAdminTable : styles.dashTable}>
        {isLoading ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            Users data loading, Please Wait...
          </h1>
        ) : errUse ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            An error occured...
          </h1>
        ) : (
          <>
            {tableData.length === 0 ? (
              <h1 className="text-[#09483D] font-bold text-2xl text-center">
                No User Yet!
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
                      <tr key={i.toString()} className={styles.dashTableTR}>
                        <td className="py-2 px-2 text-gray-700">
                          {item.userid}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.firstname}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.lastname}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.email}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.username}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          +{item.phone_num}
                        </td>
                        <td className="py-2 px-2 text-gray-700">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {!errUse && !isLoading && totalPgs > 1 && (
        <Pagination
          totalPages={totalPgs}
          currentPage={currentPg}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default UsersComponent;
