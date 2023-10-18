import { Form } from "antd";
import { CustomInput } from "../../componets/input/custom-input";
import { PasswordInput } from "../../componets/input/password-input";
import { TRegisterType } from "../../data-types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearError,
  sendRegisterData,
  setActiveErorreModal,
} from "../../app/auth-slice";
import { FormButton } from "../../componets/custom-button/form-btn";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../path";
import { useEffect } from "react";
import { ErrorModal } from "../../componets/error-modal";

export const Registrate = () => {
  const active = useAppSelector((state) => state.auth.isActive);
  const actionMessage = useAppSelector((state) => state.auth.error);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSubmit = (values: TRegisterType) => {
    form.resetFields();
    dispatch(clearError());
    return dispatch(sendRegisterData(values));
  };

  useEffect(() => {
    switch (true) {
      case actionMessage === "Done":
        return navigate(Path.login);
      case actionMessage !== "":
        dispatch(setActiveErorreModal(true));
    }
  }, [actionMessage]);

  return (
    <div className="layout">
      <div className="card">
        <h2>Registration</h2>
        <Form onFinish={onSubmit} form={form}>
          <CustomInput name="login" placeholder="Name" />
          <CustomInput type="email" name="email" placeholder="Email" />
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput name="confirmPassword" placeholder="Repeat password" />
          <FormButton htmlType="submit">Registrate</FormButton>
        </Form>
        <span className="login-link__to__register__login">
          Alredy register ?
          <span className="material-symbols-outlined">login</span>
          <Link className="link" to={Path.login}>
            Sign in
          </Link>
        </span>
      </div>
      <ErrorModal activeErrorModal={active}>{actionMessage}</ErrorModal>
    </div>
  );
};
