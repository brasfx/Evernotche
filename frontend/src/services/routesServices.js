import http from '../http-common';
const create = (data) => {
  return http.post('/new-register', data);
};

const createNote = (data) => {
  return http.post('/new-note',data);
};

//const findNote  = (id) => {
//  return http.get('/note/:id',id);
//};

const findAllNote  = (id) => {
  return http.get('/note',id);
};

const login = (data) => {
  return http.post(`/login`, data);
};

const support = (data) => {
  return http.post(`/support`, data);
};

export default {
  create,
  createNote,
  findAllNote,
  login,
  support,
};
