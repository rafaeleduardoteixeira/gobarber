import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.post("/", celebrate({
  [Segments.BODY]: {
    provider_id: Joi.number().required(),
    date: Joi.date()
  }
}), appointmentsController.create);
appointmentsRouter.get("/me", providerAppointmentsController.index);
export default appointmentsRouter;
