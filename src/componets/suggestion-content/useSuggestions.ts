import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchSuggestion } from "../../app/suggestions-slice";

export function useSuggestions() {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state) => state.suggestions.items);

  const value = useAppSelector((state) => state.suggestions.value);

  const filteredSiggestionsItems = suggestions.filter((suggestion) => {
    if (!value) {
      return suggestions;
    }
    return suggestion.user.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchSuggestion());
  }, [dispatch]);
  return { dispatch, suggestions, filteredSiggestionsItems };
}
