import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import AddChannel from "./pages/AddChannel";
import ShowChannel from "./pages/ShowChannel";
import { ChannelContextProvider } from "./context/ChannelContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

export default function App() {
  const [backendResponse, setbackendResponse] = useState<string | null>(null);

  const getBackendResponse = async () => {
    const r = await (
      await fetch(process.env.REACT_APP_BACKEND_URL || "", {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
    ).json();
    setbackendResponse(r);
  };

  useEffect(() => {
    getBackendResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!backendResponse) {
    return <>Failed to load server...</>;
  }

  return (
    <UserContextProvider>
      <ChannelContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="" element={<ShowChannel />} />
              <Route path="add" element={<AddChannel />} />
            </Route>
          </Routes>
        </Router>
      </ChannelContextProvider>
    </UserContextProvider>
  );
}
