/* eslint-disable max-len */
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});

// Conceitos:
// Models é como os dados são estruturados.
// Repositories é como os dados são persistidos. Em outras palavras, é uma camada que fica entre o domínio do seu projeto e o banco de dados.
// Routes é responsável por obter uma solicitação, despachá-la para o serviço responsável e, em seguida, fornecer uma resposta. Provavelmente ele lida com a transformação de dados também (por exemplo: usando parseISO () para converter uma string em um objeto Date).
// Services tem a ver com as regras de negócios. Todas as lógicas de regras de negócios devem estar no serviço.
