import { Router } from "express";
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const appointmentsController = new ProvidersController();

providersRouter.get("/", appointmentsController.index);
export default providersRouter;
