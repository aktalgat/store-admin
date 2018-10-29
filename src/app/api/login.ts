import { fetchPOST } from './helper';

export const post = (data: any) => {
  return fetchPOST('api/public/auth/signin', data);
};

export const put = (data: any) => {
  try {
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

export const remove = () => {
  try {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    return { response: { token: '' } };
  } catch (e) {
    return { error: e.message };
  }
};
