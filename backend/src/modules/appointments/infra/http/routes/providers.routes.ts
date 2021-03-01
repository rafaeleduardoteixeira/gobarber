import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.get("/", providersController.index);
providersRouter.get("/:provider_id/month-availability", celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.number().required(),
  }
}), providerMonthAvailabilityController.index);
providersRouter.get("/:provider_id/day-availability", celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.number().required(),
  }
}), providerDayAvailabilityController.index);
export default providersRouter;
