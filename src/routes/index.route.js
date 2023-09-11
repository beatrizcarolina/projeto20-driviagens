import { Router } from "express";
import passengerRouter from "./passengers.route.js";

const router = Router();
router.use(passengerRouter);


export default router;