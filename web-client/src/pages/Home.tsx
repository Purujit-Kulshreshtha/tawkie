import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";

function Home() {
  const { username } = useContext(UserContext);
  if (!username || username.value === "") {
    return <Login />;
  }
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Home;
