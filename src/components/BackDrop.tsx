import styles from '../styles/BackDrop.module.scss';
import { BackDropProps } from "../interfaces";

const BackDrop = ({ children }: BackDropProps) => {
  return (
    <div className={styles.backdrop}>
      {children}
    </div>
  );
};

export default BackDrop;
