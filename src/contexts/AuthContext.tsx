import { createContext, useContext, useState } from 'react';
import LoginModel from '../models/Login/loginModel';
import AuthService from '../services/AuthService';

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
    const [token, setToken]=useState('');
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    const login = async (authInput: LoginModel) => {
        try {
          const result = await AuthService.login(authInput);
          setIsLoggedIn(true)
          setToken(result.accessToken)
          console.log("LOGIN RESULT: ", result)
        } catch (error) {
          console.error('Login failed:', error)
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