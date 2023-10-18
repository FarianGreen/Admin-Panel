import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TDataType, InitialState } from "../data-types/types";
import { fetchToggleStatus, getSuggestions } from "./api-constants";

export const fetchSuggestion = createAsyncThunk<TDataType[]>(
  "suggestion",
  async function (_, { rejectWithValue }) {
    const response = await getSuggestions();

    if (!response.ok) {
      return rejectWithValue("Server Error!");
    }

    const data = (await response.json()) as TDataType[];

    return data;
  }
);

export const toggleStatus = createAsyncThunk<
  TDataType,
  [number, string],
  {
    rejectValue: string;
    state: {
      suggestions: InitialState;
    };
  }
>("toggleStatus", async function ([id, value], { rejectWithValue, getState }) {
  const user = getState().suggestions.items.find(
    (item: { id: number }) => item.id === id
  );

  if (user) {
    const response = await fetchToggleStatus(id, value);

    if (!response.ok) {
      return rejectWithValue("Can't toggle status. Server error.");
    }
    const data = (await response.json()) as TDataType;
    return data;
  }
  return rejectWithValue("No such user in the list!");
});

const initialState: InitialState = {
  items: [],
  loading: false,
  error: "",
  isActive: null,
  value: "",
};

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {
    toggleModal(state, action) {
      if (state.isActive === action.payload) {
        state.isActive = null;
      } else state.isActive = action.payload;
    },
    setValueSuggestion(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestion.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleItem = state.items.find(
          (item) => item.id === action.payload.id
        );

        if (toggleItem) {
          toggleItem.status = action.payload.status;
          state.isActive = null;
        }
      });
  },
});
export const { toggleModal, setValueSuggestion } = suggestionSlice.actions;
export default suggestionSlice.reducer;
