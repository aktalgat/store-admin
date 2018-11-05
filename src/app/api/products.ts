import { fetchGET, fetchPOST } from 'app/api/helper';

export const get = (data: any) => {
  return fetchGET('api/protected/products', data);
};

export const post = (data: any) => {
  return fetchPOST('api/protected/products', data);
};
