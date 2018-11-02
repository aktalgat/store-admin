import { fetchGET, fetchPOST } from 'app/api/helper';

export const get = (data: any) => {
  return fetchGET('api/protected/categories', data);
};

export const post = (data: any) => {
  return fetchPOST('api/protected/categories', data);
};
