import { Outlet } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-header"></div>
      <div className="app-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
