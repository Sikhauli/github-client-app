import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
      <NextUIProvider>
        <React.StrictMode>
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </React.StrictMode>
      </NextUIProvider>
  </SnackbarProvider>
);
