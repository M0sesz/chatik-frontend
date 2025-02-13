import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Messages from "./pages/Messages";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Verification from "./pages/auth/Verification";
import Layout from "./layout";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  useEffect(() => {
    const colorMode = JSON.parse(window.localStorage.getItem("color-theme"));

    const className = "dark";

    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, []);

  // Використовуємо API URL з .env файлу
  const API_URL =
    import.meta.env.VITE_API_URL || "https://chatil-backend.onrender.com";

  return (
    <Routes>
      {/* Перенаправлення з / на /auth/login */}
      <Route path="/" element={<Navigate to="/auth/login" />} />

      {/* Роутинг для аутентифікації */}
      <Route path="/auth/login" element={<Login API_URL={API_URL} />} />
      <Route path="/auth/signup" element={<Signup API_URL={API_URL} />} />
      <Route path="/auth/verify" element={<Verification API_URL={API_URL} />} />

      {/* Роутинг для користувацького інтерфейсу після авторизації */}
      <Route path="/dashboard" element={<Layout API_URL={API_URL} />}>
        <Route index element={<Messages API_URL={API_URL} />} />
        <Route path="profile" element={<ProfilePage API_URL={API_URL} />} />
      </Route>
    </Routes>
  );
}
