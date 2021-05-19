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
app.post('/notedelete', noteController.remove);
app.put('/note/:noteid', noteController.update);
app.post('/noterecover', noteController.recover);
app.post('/notetrash', noteController.trash);
app.post('/trashcan', noteController.findTrash);
app.post('/noteedit', noteController.findSingleNote);
app.post('/share', noteController.share);
app.post('/finished', noteController.findFinishedNote);
app.post('/markfinished', noteController.markFinished);
app.post('/unmarkfinished', noteController.unmarkFinished);

app.post('/notehome', noteController.findNoteDateAscendingLimited);
app.post('/notenewer', noteController.findNoteDateAscending);
app.post('/noteolder', noteController.findNoteDateDescending);
app.post('/noteaz', noteController.findNoteTitleAscending);
app.post('/noteza', noteController.findNoteTitleDescending);





export { app as Router };
