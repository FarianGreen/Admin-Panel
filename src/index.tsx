import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ConfigProvider, theme } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Path } from "./path";
import { SuggestionsPage } from "./pages/suggestions";
import { ModeratorsPage } from "./pages/moderators";
import { NoticesPage } from "./pages/notice";
import { Login } from "./pages/login";
import App from "./App";
import { ModeratorPage } from "./pages/moderator-page";
import { AddModer } from "./pages/add-moder";
import { ErrorModal } from "./componets/error-modal";
import { Registrate } from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: Path.suggestions, element: <SuggestionsPage /> },
      { path: Path.moderators, element: <ModeratorsPage /> },
      { path: Path.notice, element: <NoticesPage /> },
    ],
  },
  { path: Path.login, element: <Login /> },
  { path: Path.errorMessage, element: <ErrorModal /> },
  { path: `${Path.moderatorPage}/:id`, element: <ModeratorPage /> },
  { path: Path.moderAdd, element: <AddModer /> },
  { path: Path.registrate, element: <Registrate /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
