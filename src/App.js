
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import Register from './pages/Register';
import Login from './pages/Login';
import Protector from './componant/Protector';

function App() {
  return (
    <div className="">
      <Router>
      <div className="">
      
       
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<TaskList />} />
            <Route path="*" element={<Protector Component={Home} />} />
          </Routes>
       
      </div>
    </Router>

    </div>
  );
}

export default App;
