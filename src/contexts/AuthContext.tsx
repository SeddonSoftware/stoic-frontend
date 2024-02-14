import { createContext, useContext, useState } from 'react';

interface AuthContextType {
    authUser: string|null; 
    setAuthUser: (user: any) => void; 
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  }

  const defaultContextValue: AuthContextType = {
    authUser: null,
    setAuthUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
  };

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props: any){
    const [authUser, setAuthUser]=useState(null);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    const value:AuthContextType = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )

}