import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';

const AxiosContext = createContext();
const {Provider} = AxiosContext;
const baseServerURL = 'https://antenatal-monitoring-system.onrender.com/v1'
// const baseServerURL = 'http://192.168.43.66:8000/v1'


const AxiosProvider = ({children}) => {
    const authContext = useContext(AuthContext);
  
    const authAxios = axios.create({
      baseURL: baseServerURL,
    });

    authAxios.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
        }
  
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    const publicAxios = axios.create({
        baseURL: baseServerURL,
      });

      
    return (
      <Provider
        value={{
          authAxios,
          publicAxios,
        }}>
        {children}
      </Provider>
    );
  };
  
  export {AxiosContext, AxiosProvider};