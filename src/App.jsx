import "./styles/reset.scss";
import "./styles/global.scss";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import AdminAuth from './pages/AdminAuth';
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import AdminPanelBanners from "./pages/AdminPanelBanners";
import AdminPanelFilters from "./pages/AdminPanelFilters";
import ProtectedRoute from "./components/ProtectedRoute";
import { useIsAuth } from "./hooks/useIsAuth.tsx";
import TelegramWeb from "./pages/TelegramWeb.jsx";
import TelegramWebProduct from "./pages/TelegramWebProduct.jsx";

const App = () => {
  const { isAuth, isLoading } = useIsAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/admin" element={<AdminAuth/>}/>
          <Route exact path="/tg-app" element={<TelegramWeb /> } />
          <Route exact path="/tg-app/product" element={<TelegramWebProduct />} />
          <Route exact path="/admin-panel" element={<ProtectedRoute isAuth={isAuth} Component={AdminPanel} />}/>
          <Route exact path="/admin-panel/banners"  element={<ProtectedRoute isAuth={isAuth} Component={AdminPanelBanners} />}/>
          <Route exact path="/admin-panel/filters"  element={<ProtectedRoute isAuth={isAuth} Component={AdminPanelFilters} />}/>
          <Route
              path="*"
              element={<NotFound />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;