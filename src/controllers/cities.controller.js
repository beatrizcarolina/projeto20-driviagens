import httpStatus from "http-status";
import citiesService from "../services/cities.service.js";

async function register(req,res) {
    const { name } = req.body;
    await citiesService.create(name);
    res.sendStatus(httpStatus.CREATED);
};

export const citiesController = { register };
export default citiesController;