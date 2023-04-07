import axios, { Axios, AxiosError } from 'axios'
import {parseCookies, setCookie} from 'nookies';
import { logout } from '../contexts/AuthContext';
import { error_response } from '../types/api/error';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.40.159:5000',
  headers: {
    Authorization: `Bearer ${cookies['__session']}`
  }
});

api.interceptors.response.use(res => res, (error:AxiosError) => {
  if (error.response.status === 401) {
    const error_response = error.response.data as error_response;

    if (error_response.error === 'token_expired') {
      cookies = parseCookies();
      
      const {'__session_refresh': refresh_token} = cookies;
      const originalConfig = error.config;

      if(!isRefreshing){
        isRefreshing = true;

        api.post('/refresh', null, {
          headers: {
            Authorization: `Bearer ${refresh_token}`
          }
        }).then(res => {
          const { token } = res.data;
  
          setCookie(undefined, '__session', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          });
    
          setCookie(undefined, '__session_refresh', refresh_token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          });
  
          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          failedRequestQueue.forEach(req => req.onSuccess(token));
          failedRequestQueue = [];
        }).catch(err =>{
          failedRequestQueue.forEach(req => req.onFaliure(err));
          failedRequestQueue = [];
        }).finally(()=>{
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalConfig));
          },
          onFaliure: (err: AxiosError) => {
            reject(err);
          }
        })
      });
    } else {
      logout();
    }
  }

  return Promise.reject(error);
});