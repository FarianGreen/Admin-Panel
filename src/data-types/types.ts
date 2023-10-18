export type TDataType = {
  id: number;
  user: string;
  about?: string;
  message?: string;
  date?: string;
  status: string;
  current?: string;
  theme?: string;
};
export type InitialState = {
  items: TDataType[];
  loading: boolean;
  error: string | null;
  isActive?: number | null;
  value?: string
};
export type ColumnsType = {
  name: string;
};
type TLoginUserData = {
  login: string;
  email: string;
};
export type TRegisterType = {
  user: TLoginUserData;
  confirmPassword?: string;
  email: string;
  login: string;
  password: string;
};
export type LoginState = {
  autorizadedUser: string | null;
  isLogined?: boolean;
  loading?: boolean;
  user?: string;
  error: string | null | unknown;
  isActive?: boolean;
};
export interface IPushSliceInitialState {
  chosenModer: number | null;
  theme: string;
  message: "";
  systemMessages: ISystemMessages[];
  isActiveModer: boolean;
  isActiveAlert: boolean;
}
export interface ISystemMessages {
  id: number;
  text: string;
}
