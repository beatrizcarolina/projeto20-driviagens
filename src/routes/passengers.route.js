import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schema.js";
import passengersController from "../controllers/passengers.controller.js";

const passengerRouter = Router();
passengerRouter.post("/passengers", validateSchema(passengerSchema), passengersController.register);
passengerRouter.get("/passengers/travels");

export default passengerRouter;