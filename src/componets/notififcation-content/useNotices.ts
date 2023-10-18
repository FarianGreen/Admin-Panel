import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveErorreModal } from "../../app/auth-slice";
import {
  currentModer,
  fetchSystemMessages,
  sendMessageToModer,
  setMesage,
  setTheme,
} from "../../app/push-slice";
import { useEffect } from "react";
import { fetchModerators } from "../../app/moderator-slice";

export function useNotices() {
  const theme = useAppSelector((state) => state.push.theme);
  const message = useAppSelector((state) => state.push.message);
  const active = useAppSelector((state) => state.auth.isActive);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const id = useAppSelector((state) => state.push.chosenModer);

  const chosenModer = useAppSelector((state) => state.moderators.items).find(
    (moder) => moder.id === id
  );

  const handleSubmit = () => {
    if (!id) {
      return dispatch(setActiveErorreModal(true));
    }
    dispatch(sendMessageToModer({ id, theme, message }));
    dispatch(currentModer(null));
    dispatch(setMesage(""));
    dispatch(setTheme(""));
  };

  useEffect(() => {
    dispatch(fetchSystemMessages());
    dispatch(fetchModerators());
  }, []);

  const activeAlert = useAppSelector((state) => state.push.isActiveAlert);
  const activeModer = useAppSelector((state) => state.push.isActiveModer);

  return {
    dispatch,
    navigate,
    active,
    message,
    theme,
    chosenModer,
    handleSubmit,
    activeAlert,
    activeModer,
  };
}
