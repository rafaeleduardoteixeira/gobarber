import { Router } from "express";
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();

/* appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = container.resolve(CreateAppointmentService)
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
}); */

appointmentsRouter.post("/", appointmentsController.create);
export default appointmentsRouter;
