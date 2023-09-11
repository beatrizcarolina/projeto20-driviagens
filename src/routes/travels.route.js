import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { travelSchema } from "../schemas/travels.schema.js";
import travelsController from "../controllers/travels.controller.js";

const travelsRouter = Router();
travelsRouter.post("/travels", validateSchema(travelSchema), travelsController.register);

export default travelsRouter;