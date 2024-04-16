import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Circles } from 'react-loading-icons';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import {
  API, 
  CALLBACK_ENDPOINTS,
  getAxiosError
} from "./helpers/constants"
import { useSnackbar } from "notistack";

function App() {
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Handle callback from server
      exchangeCodeForToken(code);
    }
  }, []);


  const exchangeCodeForToken = (code) => {
    if (code) {
      setLoading(true);
      API.get(`${CALLBACK_ENDPOINTS.get}?code=${code}`)
        .then((response) => {
          const { access_token } = response.data;
          if (access_token) {
            setIsAuthenticated(true);
            setToken(access_token);
            localStorage.setItem('token', access_token);
          } else {
            console.error('Failed to exchange code for token:', access_token);
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };





  // const exchangeCodeForToken = async (code) => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch(`http://localhost:5000/api/callback?code=${code}`);
  //     const { access_token } = await response.json();

  //     if (access_token) {
  //       setIsAuthenticated(true);
  //       setToken(access_token)
  //       localStorage.setItem('token', access_token);
  //     } else {
  //       console.error('Failed to exchange code for token:', access_token);
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     console.error('Error exchanging code for token:', error);
  //     setLoading(false)
  //   }
  // };






  const LoadingScreen = () => {
    return (
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-black/10`}>
        <Circles fill="#0000cc" height="3rem" speed={2} />
      </div>
    );
  };

  return (
    <Router>
      <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home token={token} setLoading={setLoading} /> : <Login />} />
        </Routes>
        {loading && <LoadingScreen />}
      </div>
    </Router>
  );
}

export default App;

