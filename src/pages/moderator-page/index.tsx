import "./moderator-page.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { CustomButton } from "../../componets/custom-button/button";
import { Path } from "../../path";

export const ModeratorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numId = Number(id);
  const moder = useAppSelector((state) => state.moderators.items).find(
    (moder) => moder.id === numId
  );
  if (!moder) {
    return <Navigate to="/" />;
  }
  let statusModer = "";
  switch (moder.current) {
    case "Назначен":
      statusModer += "green";
      break;
    case "Остановлен":
      statusModer += "gold";
      break;
    case "Удален":
      statusModer += "red";
      break;
  }
  return (
    <div className="moder-page__wrapper">
      <div className="moder-page__container">
        <div className="card__box">
          <div className="box__content">
            <div className="moder-page__name">
              Имя модератора : {moder.user}
            </div>
            <div className="moder-page__theme">
              Тема сообщения : {moder.theme}
            </div>
            <p className="moder-page__message">
              Сообщение модератору : {moder.message}
            </p>
            <p className="moder-page__current">
              Статус модератора :{" "}
              <span className={statusModer}>{moder.current}</span>
            </p>
            <CustomButton
              className="moder-page__btn"
              onClick={() => navigate(Path.moderators)}
            >
              <span className="material-symbols-outlined">arrow_back</span>Назад
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
