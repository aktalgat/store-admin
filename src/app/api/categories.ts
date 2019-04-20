import { fetchDELETE, fetchGET, fetchPOST, fetchPUT } from 'app/api/helper';

export const get = (data: any) => {
  return fetchGET('api/protected/categories', data);
};

export const post = (data: any) => {
  return fetchPOST('api/protected/categories', data);
};

export const put = (data: any) => {
  return fetchPUT('api/protected/categories/' + data.id, data);
};

export const deleteCategory = (data: any) => {
  return fetchDELETE('api/protected/categories/' + data, data);
};
