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
import PcClub from "./pages/PcClub.jsx";

const App = () => {
  const { isAuth, isLoading } = useIsAuth();
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#090808',
        color: '#fff',
        fontFamily: 'RS'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(176, 149, 255, 0.3)',
            borderTop: '3px solid rgba(176, 149, 255, 1)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Загрузка...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/pc-club" element={<PcClub/>}/>
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