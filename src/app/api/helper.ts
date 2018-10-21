import * as fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';

const getProps = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', Authorization: '' }
};

const postProps = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: '' }
};

const fetchWrap = (path: any, props = postProps, query: string = '', data: any = null) => {
  const apiHost = process.env.API_URL || '/';

  let initProps = props;
  if (data) {
    initProps = Object.assign(props, { body: JSON.stringify(data) });
  }
  let response: any;
  return fetch(`${apiHost}${path}?${query}`, initProps)
    .then((res: any) => {
      response = res;
      return response.json();
    })
    .then((json: any) => {
      if (response.ok && response.status == 200 && json.status !== 'ERROR') {
        return { response: json };
      } else {
        return { error: json.message || json };
      }
    })
    .catch((error: any) => {
      return { error: error.message || error };
    });
};

export const fetchGET = (path: any, data: any) => {
  const query = stringify(data);
  let props = getProps;
  props.headers.Authorization = 'Bearer ' + (sessionStorage.getItem('token') || '');
  return fetchWrap(path, props, query);
};

export const fetchPOST = (path: any, data: any, query: any = '') => {
  if (query) {
    query = stringify(query);
  }
  let props = postProps;
  props.headers.Authorization = 'Bearer ' + (sessionStorage.getItem('token') || '');
  return fetchWrap(path, props, query, data);
};
