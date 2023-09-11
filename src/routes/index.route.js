import { Router } from "express";
import passengerRouter from "./passengers.route.js";
import citiesRouter from "./cities.route.js";
import flightsRouter from "./flights.route.js";
import travelsRouter from "./travels.route.js";

const router = Router();
router.use(passengerRouter);
router.use(citiesRouter);
router.use(flightsRouter);
router.use(travelsRouter);

export default router;