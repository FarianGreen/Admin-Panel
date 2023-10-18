import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchModerators } from "../../app/moderator-slice";
import { useNavigate } from "react-router-dom";

export function useModerators() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const moderators = useAppSelector((state) => state.moderators.items);

  const value = useAppSelector((state) => state.moderators.value);
  const filteredModeratorsItems = moderators.filter((moderator) => {
    if (!value) {
      return moderators;
    }
    return moderator.user.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchModerators());
  }, [dispatch]);

  return { dispatch, navigate, moderators, filteredModeratorsItems };
}
