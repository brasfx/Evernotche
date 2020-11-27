import mongoose from 'mongoose';

const registerSchema = mongoose.Schema({
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
  city: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
});
const registerModel = mongoose.model('register', registerSchema, 'register');

export { registerModel };
