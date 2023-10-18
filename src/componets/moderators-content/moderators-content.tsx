import { CustomButton } from "../custom-button/button";
import { CustomInput } from "../input/search-input";
import { Pagination } from "../pagination";
import { CustomTable } from "../table";
import "./moderators-content.css";
import { setValueModerators } from "../../app/moderator-slice";
import { Path } from "../../path";
import { useModerators } from "./useModerators";

const columns = [
  { id: 1, name: "Ф.И.О" },
  { id: 2, name: "Статус" },
  { id: 3, name: "Карма" },
];

export const ModeratorsContent = () => {
  const { dispatch, navigate, moderators, filteredModeratorsItems } =
    useModerators();
  return (
    <div className="moderators-page">
      <h1>Moderators</h1>

      <div className="control-tools">
        <Pagination itemsPerPage={10} totalItems={moderators.length} />
        <CustomInput
          clas={"finder-input"}
          text={"search"}
          placeholder={"Поиск"}
          onChange={(e) => {
            dispatch(setValueModerators(e.target.value));
          }}
        />
        <CustomButton
          className="btn-transparent-add"
          onClick={() => navigate(Path.moderAdd)}
        >
          Добавить
        </CustomButton>
      </div>
      <CustomTable
        items={filteredModeratorsItems}
        columns={columns}
        rowComponent={true}
      />
    </div>
  );
};
