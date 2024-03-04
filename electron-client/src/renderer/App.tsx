import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/UserContext';
import AddChannel from './pages/AddChannel';
import ShowChannel from './pages/ShowChannel';
import { ChannelContextProvider } from './context/ChannelContext';
import Home from './pages/Home';

export default function App() {
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
