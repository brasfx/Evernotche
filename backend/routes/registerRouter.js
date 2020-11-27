import express from 'express';
import controller from '../controllers/registerController.js';

const app = express();

app.post('/new-register', controller.create);
app.get('/register', controller.findAll);

export { app as registerRouter };
