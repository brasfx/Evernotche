import express from 'express';
import registerController from '../controllers/registerController.js';
import noteController from '../controllers/noteController.js';

const app = express();

//Registro
app.post('/new-register', registerController.create);
app.get('/register', registerController.findAll);
app.post('/login', registerController.findOne);
app.post('/support', registerController.support);
app.post('/register', registerController.remove);
app.put('/register', registerController.update);
app.put('/recover-password', registerController.recoverPassword);

//Nota
app.post('/new-note', noteController.create);
app.get('/note', noteController.findAll);
app.post('/note', noteController.findNote);
app.post('/notedelete', noteController.remove);
app.put('/note/:noteid', noteController.update);
app.post('/noterecover', noteController.recover);
app.post('/notetrash', noteController.trash);
app.post('/trashcan', noteController.findTrash);
app.post('/noteedit', noteController.findSingleNote);

export { app as Router };
