import styles from "../styles/Error.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);

  return (
    <>
      <div className={styles.logo}>
        <Link to="/">
          <img src="../logo.png" alt="logo" />
          <h5>EmergTrack</h5>
        </Link>
      </div>
      <div className={styles.hero}>
        <div className={styles.errorContent}>
          <span>404</span>
          <p>Sorry, we can not find the page you are looking for!</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
