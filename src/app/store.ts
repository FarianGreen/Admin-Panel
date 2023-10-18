import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import suggestionSlice from "./suggestions-slice";
import moderatorsSlice from "./moderator-slice";
import pushSlice from "./push-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    suggestions: suggestionSlice,
    moderators: moderatorsSlice,
    push: pushSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
