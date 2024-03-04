import { createContext, useContext, useState, useEffect } from 'react';
import LoginModel from '../models/Login/loginModel';
import authService from '../services/AuthService';

interface AuthContextType {
    token: string|null; 
    setToken: (user: any) => void; 
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (authInput: LoginModel) => void;
  }

  const defaultContextValue: AuthContextType = {
    token: null,
    setToken: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    login: () => {}
  };

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props: any){
    const isTokenExpired = () => {
      const expiresAt = sessionStorage.getItem('expiresAt');
      return new Date().getTime() > Number(expiresAt);
    };
    
    const [token, setToken] = useState<string | null>(() => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken && !isTokenExpired()) {
        return storedToken;
      }
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expiresAt');
      return null;
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token !== null);

    useEffect(() => {
      if (token) {
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expiresAt');
        setIsLoggedIn(false);
      }
    }, [token]);

    const login = async (authInput: LoginModel) => {
      try {
        const result = await authService.login(authInput);
        const expiresAt = new Date().getTime() + result.expiresIn * 1000; // Assuming expiresIn is in seconds
        sessionStorage.setItem('token', result.accessToken);
        sessionStorage.setItem('expiresAt', expiresAt.toString());
        setToken(result.accessToken);
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    };

    const value:AuthContextType = {
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        login
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )

}