import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const usersRouter = Router();
const profileController = new ProfileController();

usersRouter.use(ensureAuthenticated)
usersRouter.put("/", celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password'))
  }
}), profileController.update);
usersRouter.get("/", profileController.show);

export default usersRouter;
