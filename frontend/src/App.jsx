import React from 'react';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard"  element={<Home />} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
