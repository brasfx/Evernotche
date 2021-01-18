import express from 'express';
import controller from '../controllers/registerController.js';

const app = express();

app.post('/new-register', controller.create);
app.get('/register', controller.findAll);
app.delete('/register/:id', controller.remove);
app.put('/register/:id', controller.update);

export { app as registerRouter };
