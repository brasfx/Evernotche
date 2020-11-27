import mongoose from 'mongoose';
import { registerModel } from './registerModel.js';
import dotenv from 'dotenv';
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.register = registerModel;

export { db };
