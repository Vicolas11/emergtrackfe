import styles from "../styles/Home.module.scss";
import { Oval } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Oval
        ariaLabel="loading-indicator"
        height={70}
        width={70}
        strokeWidth={3}
        strokeWidthSecondary={3}
        color="#2C59C0"
        secondaryColor="white"
      />
    </div>
  );
};
