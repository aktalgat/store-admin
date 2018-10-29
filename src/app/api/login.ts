import { fetchPOST } from './helper';

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
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    return { response: { token: '' } };
  } catch (e) {
    return { error: e.message };
  }
};

export const isAdmin = (list: any): boolean => {
  return list.filter((item: any) => item.authority == 'ROLE_ADMIN').length > 0;
};
