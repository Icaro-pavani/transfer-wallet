import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

import "./App.css";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
