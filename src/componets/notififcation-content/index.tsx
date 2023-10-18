import { CustomButton } from "../custom-button/button";
import { CustomInput } from "../input/search-input";
import { NoticeDrop } from "./notice-dropdown";
import "./notififcation.css";
import { Recipients } from "./recipients";
import { setMesage, setTheme } from "../../app/push-slice";
import { Path } from "../../path";
import { ErrorModal } from "../error-modal";
import { useNotices } from "./useNotices";

export const NotififcationContent = () => {
  const {
    dispatch,
    navigate,
    active,
    message,
    theme,
    chosenModer,
    handleSubmit,
    activeAlert,
    activeModer,
  } = useNotices();
  return (
    <div className="notice-page">
      <h1>Push</h1>
      <NoticeDrop
        typemessage={"Выберите тип уведомления"}
        type="alert"
        active={activeAlert}
      />
      <NoticeDrop
        typemessage={"Выберите кому отправить"}
        type="moders"
        active={activeModer}
      />
      <div className="recipients-container">
        {chosenModer ? <Recipients name={chosenModer?.user} /> : null}
      </div>

      <div className="form-conatiner">
        <CustomInput
          clas="push-input"
          placeholder="Введите текст"
          label="Тема"
          type="text"
          name="them"
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
        />
        <textarea
          className="text-area-input"
          placeholder="Введите текст"
          name="message"
          value={message}
          onChange={(e) => dispatch(setMesage(e.target.value))}
        />
        <div className="btn-form-container">
          <CustomButton
            className={"btn big-red-btn"}
            onClick={() => navigate(Path.moderators)}
          >
            Вернуться назад
          </CustomButton>
          <CustomButton
            className={"big-green-btn"}
            htmlType="submit"
            onClick={handleSubmit}
          >
            Отправить
          </CustomButton>
        </div>
      </div>
      <div className="notififcation-errormodal">
        <ErrorModal activeErrorModal={active}>
          Выберите кому отправить сообщение
        </ErrorModal>
      </div>
    </div>
  );
};
