import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; import App from './App';
import Files from './Files';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);