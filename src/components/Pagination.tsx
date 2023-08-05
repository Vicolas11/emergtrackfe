import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import styles from "../styles/Pagination.module.scss";
import { PaginationProps } from "../interfaces";
import { TbDots } from "react-icons/tb";
import { useState } from "react";

const Pagination = (props: PaginationProps) => {
  const { totalPages, currentPage, onPageChange } = props;
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={i === pageNumber ? styles.pgActive : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }
    } else {
      const firstPageNumbers = [];
      const lastPageNumbers = [];

      // Display first three pages
      for (let i = 1; i <= 3; i++) {
        firstPageNumbers.push(
          <li
            key={i}
            className={i === pageNumber ? styles.pgActive : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }

      // Display last three pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        lastPageNumbers.push(
          <li
            key={i}
            className={i === pageNumber ? styles.pgActive : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }

      pageNumbers.push(...firstPageNumbers);

      // Add ellipsis (...) if there are more pages between first and last pages
      if (pageNumber > 4 && pageNumber <= totalPages - 3) {
        pageNumbers.push(<li key="ellipsis" className={styles.dots}><TbDots /></li>);
      }

      // Display current page and adjacent pages
      for (
        let i = Math.max(4, pageNumber - 1);
        i <= Math.min(totalPages - 3, pageNumber + 1);
        i++
      ) {
        pageNumbers.push(
          <li
            key={i}
            className={i === pageNumber ? styles.pgActive : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }

      pageNumbers.push(...lastPageNumbers);
    }

    return pageNumbers;
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      handlePageChange(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      handlePageChange(pageNumber + 1);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.btn_prev}
        onClick={handlePreviousPage}
        disabled={pageNumber === 1}
      >
        <BiLeftArrowAlt color="#fff" />
        <span>Prev</span>
      </button>
      <ul className={styles.pagination}>{renderPageNumbers()}</ul>
      <button
        className={styles.btn_nxt}
        onClick={handleNextPage}
        disabled={pageNumber === totalPages}
      >
        <span>Next</span>
        <BiRightArrowAlt />
      </button>
    </div>
  );
};

export default Pagination;
