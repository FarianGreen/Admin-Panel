import { useNavigate } from "react-router-dom";
import { Header } from "./componets/header";
import { NavMenu } from "./componets/menu";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";

function App() {
  const logined = useAppSelector((state) => state.auth.isLogined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logined) {
      navigate("/login");
    }
  }, [navigate, logined]);
  return (
    <>
      <div className="wrapper">
        <Header />
        <NavMenu />
      </div>
    </>
  );
}

export default App;
