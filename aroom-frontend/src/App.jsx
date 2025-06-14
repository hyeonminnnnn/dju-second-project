import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreatePage from './pages/CreatePage';
import RoomPage from "./pages/RoomPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/room/:roomCode" element={<RoomPage />} />
            </Routes>
        </Router>
    );
};

export default App;
