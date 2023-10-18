import { CustomInput } from "../input/search-input";
import { Pagination } from "../pagination";
import { CustomTable } from "../table";
import "./suggestion.css";
import { setValueSuggestion } from "../../app/suggestions-slice";
import { useSuggestions } from "./useSuggestions";

const columns = [
  { id: 1, name: "Пользователь" },
  { id: 2, name: "Тема" },
  { id: 3, name: "Сообщение" },
  { id: 4, name: "Дата" },
  { id: 5, name: "Статус" },
];

export const SuggestionContent = () => {
  const { dispatch, suggestions, filteredSiggestionsItems } = useSuggestions();
  return (
    <div className="suggest-page">
      <h1>Предложения пользователей</h1>

      <div className="control-tools">
        <Pagination itemsPerPage={10} totalItems={suggestions.length} />
        <CustomInput
          clas={"finder-input"}
          text={"search"}
          placeholder={"Поиск"}
          onChange={(e) => {
            dispatch(setValueSuggestion(e.target.value));
          }}
        />
      </div>
      <CustomTable items={filteredSiggestionsItems} columns={columns} />
    </div>
  );
};
