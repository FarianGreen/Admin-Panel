import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TRegisterType, LoginState } from "../data-types/types";
import { checkAutorization, registerNewUser } from "./api-constants";

export const sendRegisterData = createAsyncThunk<
  TRegisterType,
  TRegisterType,
  { rejectValue: string }
>("sendRegisteredData", async function (register, { rejectWithValue }) {
  const response = await registerNewUser(register);
  if (!response.ok) {
    return rejectWithValue(await response.json());
  }
  const data = (await response.json()) as TRegisterType;

  return data;
});

export const chekAuthThunk = createAsyncThunk(
  "chek-auth",
  async function (values: TRegisterType, { rejectWithValue }) {
    const { email, password } = values;
    const response = await checkAutorization({ email, password });

    if (!response.ok) {
      return rejectWithValue(await response.json());
    }
    const data = (await response.json()) as TRegisterType;

    return data;
  }
);

const initialState: LoginState = {
  isLogined: Boolean(localStorage.getItem("user")),
  error: "",
  autorizadedUser: localStorage.getItem("user"),
  isActive: false,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    logOut: (state, action) => {
      state.isLogined = false;
      state.error = "";
      localStorage.removeItem(action.payload);
    },
    setActiveErorreModal: (state, action) => {
      state.isActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRegisterData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendRegisterData.fulfilled, (state, action) => {
        state.error = "Done";
        const { login, email } = action.payload.user;
        localStorage.setItem("user", JSON.stringify({ login, email }));
      })
      .addCase(chekAuthThunk.fulfilled, (state, action) => {
        const { login, email } = action.payload.user;
        localStorage.setItem("user", JSON.stringify({ login, email }));
        state.isLogined = true;
        state.error = "Done";
      })
      .addCase(chekAuthThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { clearError, logOut, setActiveErorreModal } = authSlice.actions;
export default authSlice.reducer;
