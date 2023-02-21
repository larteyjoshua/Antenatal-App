import React, {createContext, useState} from 'react';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
      userId: null,
      authenticated: false,
      username: null,
      loading: false
    });


    const getUserID= () => {
        return authState.userId;
      };
     
      const logout = async () => {
        setAuthState({
            userId: null,
          authenticated: false,
          username: null,
          loading: false,
        });
      };

      return (
        <Provider
          value={{
            authState,
            getUserID,
            setAuthState,
            logout,
          }}>
          {children}
        </Provider>
      );
}
export  {AuthContext, AuthProvider};