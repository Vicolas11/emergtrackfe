import { setMessageId, showMessageModal } from "../store/slices/general.slice";
import { updateIsReadMessage } from "../actions/messages/updateIsReadMessage";
import { getAllUserMessages } from "../actions/messages/getAllUserMessages";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { getAllMessages } from "../actions/messages/getAllMessages";
import { resetUpdData } from "../store/slices/message.slice";
import { getAuthUser } from "../actions/users/getAuthUser";
import { fullDateFormat } from "../utils/formatdate.util";
import MessageDetailModal from "./MessageDetailModal";
import styles from "../styles/Messages.module.scss";
import { sliceText } from "../utils/slicetext.util";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const MessagesComponent = () => {
  const msgArrData = useAppSelector((state) => state.message.messageArrData);
  const showMsgModal = useAppSelector((state) => state.general.showMsgModal);
  const isLoading = useAppSelector((state) => state.message.isLoading);
  const errUser = useAppSelector((state) => state.message.errorUser);
  const totalPgs = useAppSelector((state) => state.message.totalPages);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const successUpd = useAppSelector((state) => state.message.successUpd);
  const successUser = useAppSelector((state) => state.message.successUser);
  const successAuth = useAppSelector((state) => state.user.successAuth);
  const successAll = useAppSelector((state) => state.message.successAll);
  const [currentPg, setCurrentPg] = useState(1);
  const dispatch = useAppDispatch();
  const labels = ["Message ID", "Title", "Sender", "Date", "Content"];
  const tableData = msgArrData
    ? msgArrData.map((data) => {
        return {
          id: data.id,
          messageID: data.messageId || 541233,
          title: data.title || "Request Granded",
          sender: data.sender || "Admin",
          date: fullDateFormat(data.date) || "Monday 22nd July, 2023 02:34PM",
          isRead: data.isRead,
          content:
            sliceText(data.content, 60) ||
            "Hello Vicolas! Your request has been approved. Please contact the drivers...",
        };
      })
    : [];

  const viewModal = (id: string, status: boolean) => {
    dispatch(setMessageId(id));
    dispatch(showMessageModal(true));
    if (!status) {
      dispatch(updateIsReadMessage(id));
    }
  };

  useEffect(() => {
    if (role === "Admin") {
      dispatch(getAllMessages({ limit: 9, page: currentPg }));
    } else {
      dispatch(getAllUserMessages({ limit: 9, page: currentPg }));
      dispatch(resetUpdData());
    }

    dispatch(getAuthUser());
  }, [
    dispatch,
    successAll,
    successUser,
    successUpd,
    successAuth,
    currentPg,
    role,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPg(page);
  };

  return (
    <>
      {showMsgModal && <MessageDetailModal />}
      <div className={styles.dashTable}>
        {isLoading ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            Message loading, Please Wait...
          </h1>
        ) : errUser ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            An error occured...
          </h1>
        ) : (
          <>
            {tableData.length === 0 ? (
              <h1 className="text-[#09483D] font-bold text-2xl text-center">
                No Message Data Yet!
              </h1>
            ) : (
              <div className="overflow-x-auto relative sm:rounded-lg">
                <table className="w-full lg:w-[95%] mx-auto text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
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
                          !item.isRead
                            ? styles.dashTableTRA
                            : styles.dashTableTR
                        }
                        onClick={() => viewModal(`${item.id}`, item.isRead)}
                      >
                        <td className="py-2 px-2 text-gray-700">
                          {item.messageID}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.title}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.sender}
                        </td>
                        <td className="py-2 px-2 text-gray-700">{item.date}</td>
                        <td className="py-2 px-2 text-gray-700">
                          {item.content}
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

      {!errUser && !isLoading && totalPgs > 1 && (
        <Pagination
          totalPages={totalPgs}
          currentPage={currentPg}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default MessagesComponent;
