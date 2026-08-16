// src/context/AuthContext.jsx
import  { useState, useEffect } from 'react';
import { post, get } from '../api/fetchClient';
import { AuthContext } from './AuthContext';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  const register = async (username, password) => {
    try {
      console.log("Intentando register con usuario:", username, password);
      const data = await post('/auth/register', { username, password });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.data?.error || 'Error al registrarse' };
    }
  };

  const login = async (username, password) => {
    try {
      console.log("Intentando login con usuario:", username, password);
      const data = await post('/auth/login', { username, password });
      const { token } = data;
      localStorage.setItem('token', token);
      setToken(token);
      // Decodificar token para obtener usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ username: payload.username, id: payload.id });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.data?.error || 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Validar token al cargar la app
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Usamos un endpoint protegido para validar, por ejemplo /pedidos
        await get('/pedidos');
        // Si la petición es exitosa, el token es válido
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setUser({ username: payload.username, id: payload.id });
        setToken(storedToken);
      } catch (error) {
        // Si falla (401), el token es inválido
        console.log("Token invalido, error: ", error)
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

