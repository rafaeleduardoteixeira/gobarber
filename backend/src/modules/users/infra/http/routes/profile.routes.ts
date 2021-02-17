import { Router } from "express";
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const usersRouter = Router();
const profileController = new ProfileController();

usersRouter.use(ensureAuthenticated)
usersRouter.put("/", profileController.update);
usersRouter.get("/", profileController.show);

export default usersRouter;
