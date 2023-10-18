import { useAppDispatch } from "../../app/hooks";
import { removeChosenModer } from "../../app/push-slice";

type Props = {
  name: string | undefined;
};

export const Recipients = ({ name }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <span className="recipients-wrapper">
      <span>{name}</span>
      <span
        className="material-symbols-outlined"
        onClick={() => dispatch(removeChosenModer())}
      >
        close
      </span>
    </span>
  );
};
