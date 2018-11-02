import { fetchPOST } from './helper';
import * as jwt from "jwt-decode";

export const post = (data: any) => {
  return fetchPOST('api/public/auth/signin', data);
};

export const put = (data: any) => {
  try {
    clearStorage();
    if (data.params.remember) {
      localStorage.setItem('token', data.response.accessToken);
    } else {
      sessionStorage.setItem('token', data.response.accessToken);
    }
    return { response: { token: data.response.accessToken } };
  } catch (e) {
    return { error: e.message };
  }
};

const clearStorage = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const remove = () => {
  try {
    clearStorage();
    return { response: { token: '' } };
  } catch (e) {
    return { error: e.message };
  }
};

export const isAdmin = (list: any): boolean => {
  return list.filter((item: any) => item.authority == 'ROLE_ADMIN').length > 0;
};

export const decodeToken = (accessToken: string) => {
  console.log('access token: {}', accessToken);
  let token: any = jwt(accessToken);
  let state = {
    userName: token.userName,
    email: token.userEmail,
    login: token.login
  };
  console.log('token: {}', token);
  console.log('date: {}', Math.round(new Date().getTime() / 1000));
  const now = Math.round(new Date().getTime() / 1000);
  return {isExpired: token.exp < now, state: {...state}};
};

export const getToken = (): string => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
};
