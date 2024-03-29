import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import registerController from './registerController.js';

const Model = db.notes;
const Jerry = db.register;
const create = async (req, res) => {
  const { title, payload, userid, timestamp, color } = req.body;

  try {
    const note = new Model({ title, payload, userid, timestamp, color });
    const data = await note.save(note);
    res.send(note);
    logger.info(`POST /note - ${JSON.stringify(note)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /note - ${JSON.stringify(error.message)}`);
  }
};
// Puxa Nota Pelo ID do usuário
const findNoteDateAscendingLimited = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: {$ne:1}}).sort({date: -1}).limit(3);
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};
const findNoteDateDescending = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: {$ne:1}}).sort({date: -1});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};
const findNoteDateAscending = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: {$ne:1}}).sort({date: 1});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};
const findNoteTitleAscending = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: {$ne:1}}).sort({title: 1});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};
const findNoteTitleDescending = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: {$ne:1}}).sort({title: -1});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};

//concluidas
const findFinishedNote = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}, finished: 1});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};

//marca como concluida
const markFinished = async (req, res) => {

  const noteid = req.body.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, {$set: { finished: 1}});
    res.send({ message: 'Nota Enviada para o Lixo' });

    logger.info(`PUT /note para o lixo - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao enviar para o lixo a nota de id: ' + noteid,
    });
    logger.error(`PUT /note erro lixeira - ${JSON.stringify(error.message)}`);
  }
};

//desmarca como concluida
const unmarkFinished = async (req, res) => {

  const noteid = req.body.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, {$set: { finished: 0}});
    res.send({ message: 'Nota Enviada para o Lixo' });

    logger.info(`PUT /note para o lixo - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao enviar para o lixo a nota de id: ' + noteid,
    });
    logger.error(`PUT /note erro lixeira - ${JSON.stringify(error.message)}`);
  }
};


const findSingleNote = async (req, res) => {

  const userid = req.body.userid;
  const noteid = req.body.noteid;

  try {
    const data = await Model.find({_id: noteid, userid: userid});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};

const findTrash = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: 1 });
    res.send(data);
    logger.info(`GET /note lixo`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};

//Puxa todas por Id do usuário
const findAll = async (_, res) => {
  try {
    const data = await Model.find({});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
  }
};


//Nota é atualiada a partir de seu ID  para o lixo
const trash = async (req, res) => {

  const noteid = req.body.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, {$set: { trash: 1}});
    res.send({ message: 'Nota Enviada para o Lixo' });

    logger.info(`PUT /note para o lixo - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao enviar para o lixo a nota de id: ' + noteid,
    });
    logger.error(`PUT /note erro lixeira - ${JSON.stringify(error.message)}`);
  }
};

const recover = async (req, res) => {

  const noteid = req.body.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, {$set: { trash: 0}});
    res.send({ message: 'Nota recuperada do Lixo' });

    logger.info(`PUT /note - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao recuperar nota do lixo, nota de id: ' + noteid,
    });
    logger.error(`PUT /note - ${JSON.stringify(error.message)}`);
  }
};
//Nota é atualiada a partir de seu ID
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const noteid = req.params.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, req.body);
    res.send({ message: 'Nota atualizada com sucesso' });

    logger.info(`PUT /note - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao atualizar a nota de id: ' + noteid,
    });
    logger.error(`PUT /note - ${JSON.stringify(error.message)}`);
  }
};


//Nota é removida a partir de seu ID
const remove = async (req, res) => {
  const noteid = req.body.noteid;

  try {
    const data = await Model.deleteOne({ _id: noteid });
    res.send({ message: 'Nota excluida com sucesso' });

    logger.info(`DELETE / note - ${noteid}`);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Nao foi possivel deletar a nota de id: ' + noteid,
    });
    logger.error(`DELETE / note - ${JSON.stringify(error.message)}`);
  }
};

const share = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const email = req.body.email;
  const noteid = req.body.id;

  try {
    const emailuser = await Jerry.findOne(
      { email: email }, "_id"
    );
    

    const data = await Model.updateOne({ _id: noteid }, {$push: {userid: emailuser._id.toString()}});
    res.send({ message: 'Nota compartilhada com sucesso' });

    logger.info(`PUT /note - ${noteid} - ${emailuser._id.toString()} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao atualizar a nota de id: ' + noteid,
    });
    logger.error(`PUT /note - ${JSON.stringify(error.message)}`);
  }
};
export default { 
  create, 
  findAll, 
  remove, 
  update, 
  findTrash, 
  trash, 
  recover, 
  findSingleNote, 
  share, 
  findFinishedNote, 
  markFinished, 
  unmarkFinished, 
  findNoteDateAscendingLimited, 
  findNoteDateDescending, 
  findNoteDateAscending, 
  findNoteTitleDescending, 
  findNoteTitleAscending,  
};
