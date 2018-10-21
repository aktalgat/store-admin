import { fetchPOST } from './helper';

export const post = (data: any) => {
  return fetchPOST('api/public/auth/signin', data);
};

export const put = (data: any) => {
  try {
    sessionStorage.setItem('token', data.accessToken);
    return { response: { token: data.accessToken } };
  } catch (e) {
    return { error: e.message };
  }
};

export const remove = () => {
  try {
    sessionStorage.removeItem('token');
    return { response: { token: '' } };
  } catch (e) {
    return { error: e.message };
  }
};
