import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { Usuario } from "../types/api/usuario";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";

interface AuthCredenciais {
  identificador: string;
  senha: string;
};

interface AuthContextData {
  auth(credenciais: AuthCredenciais): Promise<void>;
  autenticado: boolean;
  usuario: Usuario;
  reload: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function reload() {
  Router.push('/');
  window.location.href = '/';
}

export function logout() {
  destroyCookie(undefined, '__session');
  destroyCookie(undefined, '__session_refresh');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const {'__session': token} = parseCookies();

    if (token) {
      api.get('/me')
      .then(res => {
        setUsuario(res.data);
        setAutenticado(true);
      })
      .catch(() => {
        logout()
      });
    }
  }, []);

  async function auth({ identificador, senha }: AuthCredenciais) {
    try {
      const {token, refresh_token} = await api.post('/auth', {
        identificador,
        senha
      }).then(res => res.data);

      setCookie(undefined, '__session', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setCookie(undefined, '__session_refresh', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, autenticado, usuario, reload }}>
      {children}
    </AuthContext.Provider>
  )
}