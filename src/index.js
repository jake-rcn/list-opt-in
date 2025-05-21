

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';

import App from './App';
import UnSubscribe from './pages/UnSubscribe.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <motion.div layout className="text-white w-full h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-cloudline to-deep-wave z-0 transition-all duration-300">
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/unsubscribe" element={<UnSubscribe />} />
        </Routes>
      </Router>
    </Provider>
    </motion.div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
