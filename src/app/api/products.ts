import { fetchGET, fetchPOST, fetchPUT, fetchDELETE } from 'app/api/helper';

export const get = (data: any) => {
  return fetchGET('api/protected/products', data);
};

export const post = (data: any) => {
  return fetchPOST('api/protected/products', data);
};

export const put = (data: any) => {
  return fetchPUT('api/protected/products/' + data.id, data);
};

export const deleteProduct = (data: any) => {
  return fetchDELETE('api/protected/products/' + data, data);
};
