import { Router } from 'express';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/transactions/:id', transactionsRouter);
routes.use('/transactions/import', transactionsRouter);

export default routes;
