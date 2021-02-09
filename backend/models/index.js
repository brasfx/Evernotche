import mongoose from 'mongoose';
import { registerModel, noteModel } from './models.js';

import dotenv from 'dotenv';
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.register = registerModel;
db.notes = noteModel;

export { db };
