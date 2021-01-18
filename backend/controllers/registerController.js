import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Model = db.register;
const create = async (req, res) => {
  const { name, email, password, country } = req.body;

  try {
    const register = new Model({ name, email, password, country });
    const data = await register.save(register);
    res.send(register);
    logger.info(`POST /register - ${JSON.stringify(register)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /register - ${JSON.stringify(error.message)}`);
  }
};
const findAll = async (_, res) => {
  try {
    const data = await Model.find({});
    res.send(data);
    logger.info(`GET /register`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /register - ${JSON.stringify(error.message)}`);
  }
};
//usuário é atualiado a partir de seu ID
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Model.updateOne({ _id: id }, req.body);
    res.send({ message: 'Usuario atualizado com sucesso' });

    logger.info(`PUT /register - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao atualizar o usuario de id: ' + id,
    });
    logger.error(`PUT /register - ${JSON.stringify(error.message)}`);
  }
};
//usuário é removido a partir de seu ID
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Model.deleteOne({ _id: id });
    res.send({ message: 'Usuario excluido com sucesso' });

    logger.info(`DELETE / register - ${id}`);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Nao foi possivel deletar o usuário de id: ' + id,
    });
    logger.error(`DELETE / register - ${JSON.stringify(error.message)}`);
  }
};
export default { create, findAll, remove, update };
