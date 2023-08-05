import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { showMessageModal } from "../store/slices/general.slice";
import { fullDateFormat } from "../utils/formatdate.util";
import styles from "../styles/MessageModal.module.scss";
import { MdClose } from "react-icons/md";
import BackDrop from "./BackDrop";

const MessageDetailModal = () => {
  const msgArrData = useAppSelector((state) => state.message.messageArrData);
  const msgId = useAppSelector((state) => state.general.messageId);
  const data = msgArrData?.find((item) => item.id === msgId);
  const dispatch = useAppDispatch();
  // const data = {
  //   messageID: "534343",
  //   title: "Request Granted",
  //   sender: "Admin",
  //   date: "Mon 22nd Jul, 2023 02:34PM",
  //   content:
  //     "Hello Vicolas! Your request has been approved. Please contact the drivers and rider. You have sent them your way right now!",
  // };

  // useEffect(() => {
  //   if (success || hasError) {
  //     dispatch(resetCanSuccess());
  //     setIsCancel(false);
  //     dispatch(showMessageModal(false));
  //   }
  // }, [dispatch, success, hasError]);

  return (
    <BackDrop>
      <>
        <div className={styles.message_modal}>
          <span
            className={styles.icon_exit}
            onClick={() => dispatch(showMessageModal(false))}
          >
            <MdClose size={25} />
          </span>
          <h3>{data?.messageId}</h3>
          <>
            <div className={styles.items}>
              <div className={styles.label}>
                <span>Date:</span>
                <span>Title:</span>
                <span>Sender:</span>
                <span>Content:</span>
              </div>
              <div className={styles.value}>
                <span>{fullDateFormat(data?.date as string)}</span>
                <span>{data?.title}</span>
                <span>{data?.sender}</span>
                <span>{data?.content}</span>
              </div>
            </div>
            <div className={styles.btn_wrapper}>
              <button
                className={styles.btn_print}
                onClick={() => dispatch(showMessageModal(false))}
              >
                Close
              </button>
            </div>
          </>
        </div>
      </>
    </BackDrop>
  );
};

export default MessageDetailModal;
