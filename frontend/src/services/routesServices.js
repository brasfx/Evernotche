import http from '../http-common';
const create = (data) => {
  return http.post('/new-register', data);
};

export default {
  create,
};
