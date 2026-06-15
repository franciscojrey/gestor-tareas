import { createContext, useContext, useState, useEffect } from 'react';
import {
  registrarUsuario,
  validarLogin,
  guardarSesion,
  obtenerSesion,
  cerrarSesion,
} from '../storage/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    (async () => {
      const sesion = await obtenerSesion();
      setUsuario(sesion);
      setCargando(false);
    })();
  }, []);

  const login = async (nombre, password) => {
    const valido = await validarLogin(nombre, password);
    if (valido) {
      await guardarSesion(nombre);
      setUsuario(nombre);
    }
    return valido;
  };

  const registrar = (nombre, password) => registrarUsuario(nombre, password);

  const logout = async () => {
    await cerrarSesion();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}