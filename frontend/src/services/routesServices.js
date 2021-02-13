import http from '../http-common';
const create = (data) => {
  return http.post('/new-register', data);
};

const login = (data) => {
  return http.post(`/login`, data);
};

const support = (data) => {
  return http.post(`/support`, data);
};

export default {
  create,
  login,
  support,
};
