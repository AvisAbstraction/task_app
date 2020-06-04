import React from 'react';
import './App.css';
import { Router } from "./routes";
import { AppThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";



function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <AppThemeProvider>
          <Router />
        </AppThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
