import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;

// Podemos ter arquivos de rota diferentes para endpoints diferentes.
// Em routes/index.ts, chamamos a rota específica como um módulo e
// a usamos como um middleware.
// Agora em src/routes/appointments.routes.ts podemos omitir o /appointments.
