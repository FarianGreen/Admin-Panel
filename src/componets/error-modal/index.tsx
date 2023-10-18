import { useEffect } from "react";
import { setActiveErorreModal } from "../../app/auth-slice";
import { useAppDispatch } from "../../app/hooks";
import "./error-modal.css";

type Props = {
  activeErrorModal?: boolean | undefined;
  children?: any;
};

export const ErrorModal = ({ activeErrorModal, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setActiveErorreModal(false));
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [activeErrorModal]);
  return (
    <div
      className={activeErrorModal ? "error-modal active__modal" : "error-modal"}
      onClick={() => dispatch(setActiveErorreModal(false))}
    >
      <div
        className={
          activeErrorModal
            ? "error-modal__content active__modal"
            : "error-modal__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <span className="material-symbols-outlined">close</span>
    </div>
  );
};
