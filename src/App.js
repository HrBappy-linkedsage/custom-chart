import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Table from './pages/Table/Table';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Table />}></Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
