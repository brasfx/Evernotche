
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const registerModel = mongoose.model('register', registerSchema, 'register');

const noteSchema = new Schema({
    title: {
      type: String,
      required: false, //TODO
    },
    payload: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: false, //TODO
    },
    timestamp: {
      type: String,
      required: false, //TODO
    },
  });
  const noteModel =  mongoose.model('note', noteSchema, 'note');
  
  export { noteModel , registerModel };