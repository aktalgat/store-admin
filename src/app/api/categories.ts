import { fetchGET } from 'app/api/helper';

export const get = (data: any) => {
  return fetchGET('api/protected/categories', data);
};
