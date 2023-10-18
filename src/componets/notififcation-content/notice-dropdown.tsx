import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { currentModer, setActive } from "../../app/push-slice";

type Props = {
  type: string;
  typemessage: string;
  active?: boolean;
};

export const NoticeDrop = ({ typemessage, type, active }: Props) => {
  const dispatch = useAppDispatch();

  const systemAlerts = useAppSelector((state) => state.push.systemMessages);

  const showModal = () => {
    return dispatch(setActive({ active: !active, type: type }));
  };

  const moders = useAppSelector((state) => state.moderators.items).map(
    ({ id, user }) => (
      <li
        className="alert-list__li"
        key={id}
        onClick={() => {
          dispatch(currentModer(id));
          dispatch(setActive({ active: !active, type: type }));
        }}
      >
        {user}
      </li>
    )
  );
  const alerts = systemAlerts.map(({ id, text }) => (
    <li
      className="alert-list__li"
      key={id}
      onClick={() => {
        dispatch(setActive({ active: !active, type: type }));
      }}
    >
      {text}
    </li>
  ));

  return (
    <div className="notice-drop">
      <p className="paragraph">{typemessage}</p>
      <div className="system-alert" onClick={showModal}>
        Системное уведомление
        <span className="red-circle material-symbols-outlined">
          arrow_downward
        </span>
      </div>
      <ul className={active ? "alert-list isActive" : "alert-list"}>
        {type === "alert" ? alerts : moders}
      </ul>
    </div>
  );
};
