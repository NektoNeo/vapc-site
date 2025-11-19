import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config/api";

export const useIsAuth = () => {
  const currentPath = window.location.pathname;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      currentPath === "/admin" || 
      currentPath === "/admin-panel" || 
      currentPath === "/admin-panel/banners" || 
      currentPath === "/admin-panel/filters") 
    {
    const checkAuth = async () => {
      const response = await fetch(apiUrl('/isAuth/'));
      setIsAuth(response.status === 200);
      setIsLoading(false);
    };
  
    if (!isAuth) {
      checkAuth();
    }
    return
  }
  setIsLoading(false);
  }, [currentPath, isAuth]);

  return { isAuth, isLoading };
};