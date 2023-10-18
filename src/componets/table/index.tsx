import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ColumnsType, TDataType } from "../../data-types/types";
import { DropDown } from "../drop-down";
import { Popup } from "../popup-button";
import "./custom-table.css";
import { Path } from "../../path";

type Props = {
  items: TDataType[];
  columns: Array<ColumnsType>;
  rowComponent?: boolean;
};

export const CustomTable = ({ columns, rowComponent, items }: Props) => {
  const activeSuggestId = useAppSelector((state) => state.suggestions.isActive);
  const activeModerId = useAppSelector((state) => state.moderators.isActive);
  const navigate = useNavigate();

  const renderModerRow = (item: TDataType) => {
    const activeModer = activeModerId === item.id ? true : false;
    let statusModer = "";
    switch (item.current) {
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
      <tr className="moder_row" key={item.id}>
        <td>{item.user}</td>
        <td className={statusModer}>{item.current}</td>
        <td onClick={() => navigate(`${Path.moderatorPage}/${item.id}`)}>
          {item.theme}
        </td>
        <td>
          <Popup active={activeModer} id={item.id} />
        </td>
      </tr>
    );
  };
  const renderSuggestRow = (item: TDataType) => {
    const activeSuggest = activeSuggestId === item.id ? true : false;
    let color = "status-btn ";
    switch (item.status) {
      case "Done":
        color += "green";
        break;
      case "Reject":
        color += "red";
        break;
      case "Processing":
        color += "gold";
        break;
    }
    return (
      <tr key={item.id}>
        <td>{item.user}</td>
        <td>{item.about}</td>
        <td>{item.message}</td>
        <td>{item.date}</td>
        <td>
          <DropDown
            className={color}
            status={item.status}
            id={item.id}
            active={activeSuggest}
          />
        </td>
      </tr>
    );
  };

  const renderColumn = ({ name }: ColumnsType) => {
    return <th>{name}</th>;
  };

  return (
    <div className="my-custom-table">
      <table className="table">
        <thead className="thead">
          <tr className="tr">{columns.map(renderColumn)}</tr>
        </thead>
        <tbody>
          {rowComponent
            ? items.map(renderModerRow)
            : items.map(renderSuggestRow)}
        </tbody>
      </table>
    </div>
  );
};
