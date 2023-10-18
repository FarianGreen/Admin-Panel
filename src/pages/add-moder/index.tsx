import { CustomButton } from "../../componets/custom-button/button";
import { CustomInput } from "../../componets/input/custom-input";
import { useAppDispatch } from "../../app/hooks";
import { addNewModerator } from "../../app/moderator-slice";
import { useNavigate } from "react-router-dom";
import { Path } from "../../path";
import { Form } from "antd";

export const AddModer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = (data: { name: string }) => {
    const { name } = data;
    dispatch(addNewModerator(name));
    navigate(Path.moderators);
  };

  return (
    <div className="login">
      <div className="card-form">
        <Form className="login-form" onFinish={submitForm}>
          <h3 className="login-title">Add moder</h3>
          <div className="login-content">
            <CustomInput name="name" placeholder="Name" />
          </div>
          <CustomButton className={"login-btn"} htmlType="submit">
            Добавить
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};
