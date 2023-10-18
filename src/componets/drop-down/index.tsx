import "./drop-down.css";
import { useAppDispatch } from "../../app/hooks";
import { toggleModal, toggleStatus } from "../../app/suggestions-slice";

type Props = {
  id: number;
  status: string;
  className?: string;
  active?: boolean;
};

export const DropDown = ({ id, status, className, active }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="wrapper-modal" onClick={() => dispatch(toggleModal(id))}>
      <span className={className}>{status}</span>

      <ul className={active ? "modal toggle-modal" : "modal"}>
        <li
          className="green li-item"
          onClick={() => dispatch(toggleStatus([id, "Done"]))}
        >
          Done
        </li>
        <li
          className="red li-item"
          onClick={() => dispatch(toggleStatus([id, "Reject"]))}
        >
          Reject
        </li>
        <li
          className="gold li-item"
          onClick={() => dispatch(toggleStatus([id, "Processing"]))}
        >
          Processing
        </li>
      </ul>
    </div>
  );
};
