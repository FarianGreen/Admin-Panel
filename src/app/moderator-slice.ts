import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TDataType, InitialState } from "../data-types/types";
import {
  fetchAddNewModer,
  fetchToggleModerator,
  getModerators,
} from "./api-constants";

export const fetchModerators = createAsyncThunk<TDataType[]>(
  "moderators",
  async function (_, { rejectWithValue }) {
    const response = await getModerators();

    if (!response.ok) {
      return rejectWithValue("Server Error!");
    }

    const data = (await response.json()) as TDataType[];

    return data;
  }
);

export const toggledModerator = createAsyncThunk<
  TDataType,
  [number, string],
  {
    rejectWithValue: string;
    state: {
      moderators: InitialState;
    };
  }
>(
  "toggledModerator",
  async function ([id, value], { rejectWithValue, getState }) {
    const moder = getState().moderators.items.find(
      (item: { id: number }) => item.id === id
    );
    if (moder) {
      const response = await fetchToggleModerator(id, value);

      if (!response.ok) {
        return rejectWithValue("Can't toggle Moder. Server error.");
      }
      const data = (await response.json()) as TDataType;
      return data;
    }
    return rejectWithValue("Can't toggle moderator. Server error.");
  }
);

export const addNewModerator = createAsyncThunk<
  TDataType,
  string,
  {
    rejectValue: string;
  }
>("addNewModerator", async function (params, { rejectWithValue }) {
  const response = await fetchAddNewModer(params);
  if (!response.ok) {
    return rejectWithValue("Can't add'");
  }
  const data = (await response.json()) as TDataType;
  return data;
});

const initialState: InitialState = {
  items: [],
  loading: false,
  error: "",
  isActive: null,
  value: "",
};
const moderatorsSlice = createSlice({
  name: "moderators",
  initialState,
  reducers: {
    toggledModer(state, action) {
      if (state.isActive === action.payload) {
        state.isActive = null;
      } else state.isActive = action.payload;
    },
    setValueModerators(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModerators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModerators.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })
      .addCase(fetchModerators.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(toggledModerator.fulfilled, (state, action) => {
        const toggledModerator = state.items.find(
          (item) => item.id === action.payload.id
        );

        if (toggledModerator) {
          toggledModerator.current = action.payload.current;
          state.isActive = null;
        }
      })
      .addCase(addNewModerator.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export const { toggledModer, setValueModerators } = moderatorsSlice.actions;
export default moderatorsSlice.reducer;
