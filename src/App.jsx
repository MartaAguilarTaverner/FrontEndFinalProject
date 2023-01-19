import React from 'react';

import { Outlet } from 'react-router-dom';

import UpMenu from './GeneralComponents/menubar/menubarFirst';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <UpMenu />
      </div>
      <div className="app-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
