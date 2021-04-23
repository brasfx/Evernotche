import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Model = db.notes;
const create = async (req, res) => {
  const { title, payload, userid, timestamp } = req.body;

  try {
    const note = new Model({ title, payload, userid, timestamp });
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
const findNote = async (req, res) => {
  logger.info(` body: ${req.body}`);

  const userid = req.body.userid;
  logger.info(` id: ${userid}`);
  try {
    const data = await Model.find({userid: userid, trash: {$ne: 1}});
    res.send(data);
    logger.info(`GET /note`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /note - ${JSON.stringify(error.message)}`);
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
    logger.info(`GET /note`);
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

  const noteid = req.params.noteid;

  try {
    const data = await Model.updateOne({ _id: noteid }, {$set: { trash: 1}});
    res.send({ message: 'Nota Enviada para o Lixo' });

    logger.info(`PUT /note - ${noteid} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao enviar para o lixo a nota de id: ' + noteid,
    });
    logger.error(`PUT /note - ${JSON.stringify(error.message)}`);
  }
};

const recover = async (req, res) => {

  const noteid = req.params.noteid;

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
  const noteid = req.body.id;

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
export default { create,findNote, findAll, remove, update, findTrash, trash, recover, findSingleNote };
