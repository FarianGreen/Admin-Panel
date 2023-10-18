import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TDataType, InitialState, ISystemMessages, IPushSliceInitialState } from "../data-types/types";
import { fetchMessageToModer, systemMessages } from "./api-constants";

export const sendMessageToModer = createAsyncThunk<
  TDataType,
  { id: number | null; theme: string; message: string },
  {
    rejectWithValue: string;
    state: {
      moderators: InitialState;
    };
  }
>(
  "messageModer",
  async function ({ id, theme, message }, { rejectWithValue, getState }) {
    const moder = getState().moderators.items.find(
      (item: { id: number }) => item.id === id
    );
    if (moder) {
      const response = await fetchMessageToModer(id, theme, message);
      if (!response.ok) {
        return rejectWithValue("Can't toggle Moder. Server error.");
      }
      const newMessage = (await response.json()) as TDataType;

      return newMessage;
    }
    return rejectWithValue("No such messages in the list!");
  }
);

export const fetchSystemMessages = createAsyncThunk<ISystemMessages[]>(
  "systemMessages",
  async function (_, { rejectWithValue }) {
    const response = await systemMessages();
    if (!response.ok) {
      return rejectWithValue("Server Error!");
    }

    const data = (await response.json()) as ISystemMessages[];
    return data;
  }
);

const initialState:IPushSliceInitialState = {
  chosenModer: null,
  theme: "",
  message: "",
  systemMessages: [],
  isActiveModer: false,
  isActiveAlert: false,
};
const pushSlice = createSlice({
  name: "push",
  initialState,
  reducers: {
    currentModer(state, action) {
      state.chosenModer = action.payload;
    },

    removeChosenModer(state) {
      state.chosenModer = null;
    },
    setActive(state, action) {
      switch (action.payload.type) {
        case "alert":
          state.isActiveAlert = action.payload.active;
          break;
        case "moders":
          state.isActiveModer = action.payload.active;
          break;
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setMesage(state, action) {
      state.message = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSystemMessages.fulfilled, (state, action) => {
      state.systemMessages = action.payload;
    });
  },
});

export const {
  currentModer,
  removeChosenModer,
  setActive,
  setTheme,
  setMesage,
} = pushSlice.actions;
export default pushSlice.reducer;
