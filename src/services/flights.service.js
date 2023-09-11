import flightsRepository from "../repositories/flights.repository.js";
import { cityValidation } from "../utils/validations.js";

async function create(origin, destination, date) {
    const validOrigin = await cityValidation(origin);
    const validDestination = await cityValidation(destination);

    if (!validOrigin || !validDestination) {
        throw { type: "notFound", message: "City not found" };
    }

    if (origin === destination) {
        throw { type: "conflict", message: "Origin and destination cannot be the same" };
    }

    const rightDate = date.split("-").reverse().join("-");
    if (new Date(rightDate) < new Date()) {
        throw { type: "unprocessable", message: "Date must be in the future" };
    }

    return await flightsRepository.insert(origin, destination, rightDate);
};

const flightsService = { create };
export default flightsService;