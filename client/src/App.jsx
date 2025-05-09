import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import AuthContextProvider from "./context/authContextProvider";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element = {<Dashboard/>} />
        </Routes>
    </Router>
    </AuthContextProvider>
    
  );
}

export default App;
