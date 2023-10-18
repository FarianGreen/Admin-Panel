import "./popup.css";
import { useAppDispatch } from "../../app/hooks";
import { toggledModerator, toggledModer } from "../../app/moderator-slice";

type Props = {
  id: number;
  active: boolean;
};

export const Popup = ({ active, id }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="popup-wrapper"
      onClick={() => {
        dispatch(toggledModer(id));
      }}
    >
      <span>Выбрать статус</span>

      <ul className={active ? "popup-list show" : "popup-list"}>
        <li
          className="green popup-li-item"
          onClick={() => {
            dispatch(toggledModerator([id, "Назначен"]));
          }}
        >
          Назначить
        </li>
        <li
          className="gold popup-li-item"
          onClick={() => {
            dispatch(toggledModerator([id, "Остановлен"]));
          }}
        >
          Остановить
        </li>
        <li
          className="red popup-li-item"
          onClick={() => {
            dispatch(toggledModerator([id, "Удален"]));
          }}
        >
          Удалить
        </li>
      </ul>
      <span className="red-circle material-symbols-outlined">
        arrow_downward_alt
      </span>
    </div>
  );
};
