
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
      type: Array,
      required: false, //TODO
    },
    date: {
      type: Date,
      required: false,
      default: Date.now //TODO
    },
    trash: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    finished: {
      type: Number,
      required: false,
    },
  });
  const noteModel =  mongoose.model('note', noteSchema, 'note');
  
  export { noteModel , registerModel };
