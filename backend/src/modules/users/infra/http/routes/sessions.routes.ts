import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import SesseionsController from '@modules/users/infra/http/controllers/SessionsController'

const sessionsRouter = Router();
const sesseionsController = new SesseionsController();

sessionsRouter.post("/", celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), sesseionsController.create);

export default sessionsRouter;
