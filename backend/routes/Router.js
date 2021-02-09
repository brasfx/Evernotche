import express from 'express';
import registerController from '../controllers/registerController.js';
import noteController from '../controllers/noteController.js';

const app = express();

//Registro
app.post('/new-register', registerController.create);
app.get('/register', registerController.findAll);
app.delete('/register/:id', registerController.remove);
app.put('/register/:id', registerController.update);
//Nota
app.post('/new-note', noteController.create);
app.get('/note', noteController.findAll);
app.get('/note/:id', noteController.find);
app.delete('/note/:id', noteController.remove);
app.put('/note/:id', noteController.update);



export { app as Router };





