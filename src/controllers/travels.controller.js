import httpStatus from "http-status";
import travelsService from "../services/travels.service.js";

async function register(req, res) {
    const { passengerId, flightId } = req.body;
    await travelsService.create(passengerId, flightId);
    res.sendStatus(httpStatus.CREATED);
};

export const travelsController = { register };
export default travelsController;