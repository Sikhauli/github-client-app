import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { Circles } from "react-loading-icons";
import Home from "./pages/Home/index";

import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state.loading.value);
  
  const LoadingScreen = () => {
    return (
      <div
        className={`fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-black/10`}
      >
        <Circles fill="#006FEE" height="3rem" speed={2} />
      </div>
    );
  };

  return (
    <Router>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        {loading && <LoadingScreen />}
      </div>
    </Router>
  );
}

export default App;





