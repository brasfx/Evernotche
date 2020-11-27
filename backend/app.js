import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { registerRouter } from './routes/registerRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';
//conexão com o banco
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(registerRouter);

app.listen(process.env.PORT || 8081, () => {
  logger.info(`Servidor em execução na porta ${process.env.PORT}`);
});
