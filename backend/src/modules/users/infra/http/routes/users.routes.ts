import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import multer from "multer";
import uploadConfig from "@config/upload";
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";
import UsersController from '@modules/users/infra/http/controllers/UserController'
import AvatarController from '@modules/users/infra/http/controllers/AvatarController'

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const avatarController = new AvatarController();

usersRouter.post("/", celebrate({
  [Segments.BODY]: {
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersController.create);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), avatarController.update);

export default usersRouter;
