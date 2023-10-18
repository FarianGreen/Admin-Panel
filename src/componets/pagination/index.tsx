import { CustomButton } from "../custom-button/button";
import "./pagination.css";
type Props = {
  itemsPerPage: number;
  totalItems: number;
};

export const Pagination = ({ itemsPerPage, totalItems }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <CustomButton className={"btn pagination-btn"}>
        <span className="material-symbols-outlined">chevron_left</span>
      </CustomButton>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return <li className="pagination-number">{number}</li>;
        })}
      </ul>
      <CustomButton className={"btn pagination-btn"}>
        <span className="material-symbols-outlined">chevron_right</span>
      </CustomButton>
    </div>
  );
};
