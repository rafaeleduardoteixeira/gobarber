import { Router } from "express";
import { container } from 'tsyringe'
import SesseionsController from '@modules/users/infra/http/controllers/SessionsController'

const sessionsRouter = Router();
const sesseionsController = new SesseionsController();

sessionsRouter.post("/", sesseionsController.create);

export default sessionsRouter;
