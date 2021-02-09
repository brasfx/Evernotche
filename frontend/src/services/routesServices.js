import http from '../http-common';
const create = (data, type) => {
  if (type == 1){
    return http.post('/new-register', data);
  }else if (type == 2){
    return http.post('/new-note', data);
  }

};

export default {
  create,
};
