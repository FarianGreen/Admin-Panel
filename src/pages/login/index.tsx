import { CustomInput } from "../../componets/input/custom-input";
import { PasswordInput } from "../../componets/input/password-input";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Form } from "antd";
import { FormButton } from "../../componets/custom-button/form-btn";
import { TRegisterType } from "../../data-types/types";
import {
  chekAuthThunk,
  clearError,
  setActiveErorreModal,
} from "../../app/auth-slice";
import { Path } from "../../path";
import { useEffect } from "react";
import { ErrorModal } from "../../componets/error-modal";

export const Login = () => {
  const active = useAppSelector((state) => state.auth.isActive);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actionMessage = useAppSelector((state) => state.auth.error);

  const onFinish = (values: TRegisterType) => {
    dispatch(chekAuthThunk(values));
    dispatch(clearError());
  };

  useEffect(() => {
    switch (true) {
      case actionMessage === "Done":
        return navigate(Path.moderators);
      case actionMessage !== "":
        dispatch(setActiveErorreModal(true));
    }
  }, [actionMessage]);

  return (
    <div className="login">
      <div className="card-form">
        <h3 className="login-title">Авторизация</h3>
        <Form onFinish={onFinish}>
          <div className="login-content">
            <CustomInput name="email" placeholder="Email" type="email" />
            <PasswordInput name="password" placeholder="Password" />
          </div>
          <FormButton
            htmlType="submit"
            type="primary"
            danger
            style={{ width: "85px" }}
          >
            LogIn
          </FormButton>
        </Form>
        <div
          className="login-link__to__register__login"
          onClick={() => {
            dispatch(clearError());
          }}
        >
          <span className="material-symbols-outlined">login</span>
          <Link className="link" to={Path.registrate}>
            Registration
          </Link>
        </div>
      </div>
      <ErrorModal activeErrorModal={active}>
        {actionMessage}
      </ErrorModal>
    </div>
  );
};
