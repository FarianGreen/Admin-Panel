import { logOut } from "../../app/auth-slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CustomButton } from "../custom-button/button";
import circle from "../img/circle.png";
import "./header.css";

export const Header = () => {
  const loginedUser = JSON.parse(
    useAppSelector((state) => state.auth.autorizadedUser)
  );

  const dispatch = useAppDispatch();
  return (
    <div className="header-wrapper">
      <div className="header__logo">
        <img className="logo" src={circle} alt="#" />
        <p className="header-logo__title">Admin Panel</p>
      </div>
      <div className="header-user__group">
        <div>{loginedUser ? loginedUser.login : null}</div>
        <CustomButton
          className={"btn btn-transparent"}
          onClick={() => {
            dispatch(logOut("user"));
          }}
        >
          Выйти
        </CustomButton>
      </div>
    </div>
  );
};
