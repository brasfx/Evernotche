import express from 'express';
import controller from '../controllers/registerController.js';

const app = express();

app.post('/new-register', controller.create);
app.get('/register', controller.findAll);
app.post('/login', controller.findOne);
app.post('/support', controller.support);
app.post('/register', controller.remove);
app.put('/register', controller.update);

export { app as registerRouter };
