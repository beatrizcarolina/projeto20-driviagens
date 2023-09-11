import httpStatus from "http-status";
import flightsService from "../services/flights.service.js";

async function register(req,res) {
    const { origin, destination, date } = req.body;
    await flightsService.create(origin, destination, date);
    res.sendStatus(httpStatus.CREATED);
};

async function get(req,res) {
    const { origin, destination } = req.query;
    const smallDate = req.query["smaller-date"];
    const bigDate = req.query["bigger-date"];
    const flights = await flightsService.getFlight(origin, destination, smallDate, bigDate);
    res.status(httpStatus.OK).send(flights);
};

export const flightsController = { register, get };
export default flightsController;