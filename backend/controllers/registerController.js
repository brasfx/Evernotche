import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
//import { error } from 'winston';
import pkg from 'winston';
//import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
const { error } = pkg;

const Model = db.register;
const create = async (req, res) => {
  const { name, email, password, country } = req.body;

  try {
    const register = new Model({ name, email, password, country });
    const data = await register.save(register);
    res.send(data);
    logger.info(`POST /register - ${JSON.stringify(register)}`);

    let message = `
    <p>Obrigado por nos escolher</p>
    <h4>Seus dados do Evernotche Web</h4>
    <ul>
      <li><b>Nome:</b> ${name}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>Senha:</b> ${password}</li>
    </ul>
    `;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`, // Change to your recipient
      from: `${process.env.EMAIL_LOGIN}`, // Change to your verified sender
      subject: 'Confirmação criação de conta',
      text: 'Seja bem vindo!',
      html: message,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email enviado');
      })
      .catch((error) => {
        console.error(error);
      });
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
      .send({ message: error.message || 'Erro ao listar todos os usuarios' });
    logger.error(`GET /register - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await Model.findOne(
      { email: email, password: password },
      res.body
    );

    res.send(data);

    logger.info(`GET /login - ${email} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Email cadastrado: ' + email,
    });
    logger.error(`GET /login - ${JSON.stringify(error.message)}`);
  }
};

//usuário é atualiado a partir de seu ID
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const { id } = req.body;

  try {
    const data = await Model.updateOne({ _id: id }, req.body);
    //res.send({ message: 'Usuario atualizado com sucesso' });
    res.send(req.body);

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
  const { id } = req.body;

  try {
    const data = await Model.deleteOne({ _id: id });
    //res.send({ message: 'Usuario excluido com sucesso' });
    res.send(JSON.stringify(data));

    logger.info(`DELETE / register - ${id}`);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Nao foi possivel deletar o usuário de id: ' + id,
    });
    logger.error(`DELETE / register - ${JSON.stringify(error.message)}`);
  }
};

const support = async (req, res) => {
  try {
    const { name, email, topic, textTopic } = req.body;

    let message = `
  <h4>Solicitação de suporte do cliente</h4>
  <p>Favor verificar e fornecer um retorno o mais rápido possivel!</p>

  <h4>Dados para suporte</h4>
  <ul>
    <li><b>Nome do usuário:</b> ${name}</li>
    <li><b>Email do usuário:</b> ${email}</li>
    <li><b>Assunto:</b> ${topic}</li>
    <li><b>Mensagem:</b> ${textTopic}</li>
  </ul>
  `;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${process.env.EMAIL_LOGIN}`,
      from: `${process.env.EMAIL_LOGIN}`,
      subject: 'Solicitação de suporte',
      text: 'Solicitação de suporte',
      html: message,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email enviado');
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao enviar email de suporte! ',
    });
    logger.error(`SUPPORT /send-email - ${JSON.stringify(error.message)}`);
  }
};

//recuperar senha
const recoverPassword = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const { email } = req.body;

  try {
    const data = await Model.updateOne({ email: email }, req.body);

    res.send(req.body.password);
    logger.info(
      `PUT /recover-password - ${email} - ${JSON.stringify(req.body)}`
    );

    let message = `
    <p>Você solicitou a recuperação de senha a partir de nosso sistema, por isso estamos enviando uma senha provisória de acesso.</p>
    <p>Após logar com a senha provisória, poderá fazer a alteração a partir do seu perfil,modificando por uma outra de sua escolha.</p>
    <h4>Senha provisória de acesso: ${req.body.password}</h4>
    <p>Caso não tenha solicitado esse serviço, favor entrar em contato conosco pelo email: ${process.env.EMAIL_LOGIN} e informe o problema.</p>
    `;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`, // Change to your recipient
      from: `${process.env.EMAIL_LOGIN}`, // Change to your verified sender
      subject: 'Recuperação de senha',
      text: 'Recuperação de senha',
      html: message,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email enviado');
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao recuperar senha',
    });
    logger.error(`PUT /recover-password - ${JSON.stringify(error.message)}`);
  }
};

export default {
  create,
  findAll,
  remove,
  update,
  findOne,
  support,
  recoverPassword,
};
