import http from '../http-common';
const create = (data) => {
  return http.post('/new-register', data);
};

const createNote = (data) => {
  return http.post('/new-note', data);
};

const findNote  = (data) => {
  return http.post('/note',data);
};

const findAllNotes = () => {
  return http.get('/note');
};

const login = (data) => {
  return http.post(`/login`, data);
};

const support = (data) => {
  return http.post(`/support`, data);
};

const recover = (data) => {
  return http.put(`/recover-password`, data);
};

const removeNote = (data) => {
  return http.post('/notedelete', data);
};

export default {
  create,
  createNote,
  findAllNotes,
  findNote,
  removeNote,
  login,
  support,
  recover,

};
