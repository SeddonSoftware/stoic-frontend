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
      const expiresAt = localStorage.getItem('expiresAt');
      return new Date().getTime() > Number(expiresAt);
    };
    
    const [token, setToken] = useState<string | null>(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !isTokenExpired()) {
        return storedToken;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      return null;
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token !== null);

    useEffect(() => {
      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        setIsLoggedIn(false);
      }
    }, [token]);

    const login = async (authInput: LoginModel) => {
      try {
        const result = await authService.login(authInput);
        const expiresAt = new Date().getTime() + result.expiresIn * 1000; // Assuming expiresIn is in seconds
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
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