import http from '../http-common';
const create = (data) => {
  return http.post('/new-register', data);
};

const updateRegister = (data) => {
  return http.put('/register', data);
};

const deleteAccount = (data) => {
  return http.post('/register', data);
};

const createNote = (data) => {
  return http.post('/new-note', data);
};

const findNote = (data) => {
  return http.post('/note', data);
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

const sendTrash = (data) => {
  return http.post('/notetrash', data);
};

const findTrashcan = (data) => {
  return http.post('/trashcan', data);
};

const recoverNote = (data) => {
  return http.post('/noterecover', data);
};
const updateNote = (id, data) => {
  return http.put(`/note/${id}`, data);
};

const findSingleNote = (data) => {
  return http.post(`/noteedit`, data);
};

const share = (data) => {
  return http.post('/share', data);
};

const findFinished = (data) => {
  return http.post('/finished', data);
};
const markFinished = (data) => {
  return http.post('/markFinished', data);
};
const unmarkFinished = (data) => {
  return http.post('/unmarkfinished', data);
};

const findNotesLimited = (data) => {
  return http.post('/notehome', data);
};
const findNotesDateAscending = (data) => {
  return http.post('/notenewer',data);
};
const findNotesDateDescending = (data) => {
  return http.post('/noteolder',data);
};
const findNotesAZ = (data) => {
  return http.post('/noteaz',data);
};
const findNotesZA = (data) => {
  return http.post('/noteza',data);
};


export default {
  create,
  createNote,
  findNote,
  removeNote,
  login,
  support,
  recover,
  sendTrash,
  findTrashcan,
  recoverNote,
  updateNote,
  updateRegister,
  deleteAccount,
  findSingleNote,
  share,
  findFinished,
  markFinished,
  unmarkFinished,
  findNotesLimited,
  findNotesDateAscending,
  findNotesDateDescending,
  findNotesAZ,
  findNotesZA,
};
