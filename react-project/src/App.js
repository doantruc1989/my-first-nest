import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Link } from "react-router-dom"
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';



function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
