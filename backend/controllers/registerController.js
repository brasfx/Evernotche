import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Model = db.register;
const create = async (req, res) => {
  const { name, email, password, city, uf } = req.body;

  try {
    const register = new Model({ name, email, password, city, uf });
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

export default { create, findAll };
