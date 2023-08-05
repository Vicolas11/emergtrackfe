import { LoadingBtnProps } from "../interfaces";
import { Oval } from "react-loader-spinner";

const LoadingBtn = ({ title, styles }: LoadingBtnProps) => {
  return (
    <button className={styles} disabled>
      <Oval
        height={25}
        width={25}
        color="#5721B7"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#5721B7"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
      <span className="ml-3">{title}...</span>
    </button>
  );
};

export default LoadingBtn;
