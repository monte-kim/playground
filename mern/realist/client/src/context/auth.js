import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

import { API } from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    refreshToken: '',
  });

  useEffect(() => {
    let fromLocalStorage = localStorage.getItem('auth');
    if (fromLocalStorage) setAuth(JSON.parse(fromLocalStorage));
  }, []);

  // axios 통신 (handle the axios requests)
  axios.defaults.baseURL = API;
  axios.defaults.headers.common['Authorization'] = auth?.token;
  axios.defaults.headers.common['refresh_token'] = auth?.refreshToken;

  // handle the axios responses
  axios.interceptors.response.use(
    (res) => {
      // 정상 작동 코드(아무것도 하지 않는다)
      return res;
    },
    async (err) => {
      // 에러 발생 시 2번째 콜백함수 실행
      const originalConfig = err.config;

      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const { data } = await axios.get('/refresh-token');
            axios.defaults.headers.common['token'] = data.token;
            axios.defaults.headers.common['refresh_token'] = data.refreshToken;

            setAuth(data);
            localStorage.setItem('auth', JSON.stringify(data));

            return axios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    },
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
