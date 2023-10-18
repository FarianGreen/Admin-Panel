import { NavLink, Outlet } from "react-router-dom";
import "./navmenu.css";
import { Path } from "../../path";

export const NavMenu = () => {
  return (
    <div className="content-container">
      <ul className="nav-menu">
        <NavLink to={Path.suggestions} className="nav-menu__item">
          Предложения
        </NavLink>
        <NavLink to={Path.moderators} className="nav-menu__item">
          Модераторы
        </NavLink>
        <NavLink to={Path.notice} className="nav-menu__item">
          Уведомления
        </NavLink>
      </ul>
      <Outlet />
    </div>
  );
};
