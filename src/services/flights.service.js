import flightsRepository from "../repositories/flights.repository.js";
import { cityValidation, dateValidation } from "../utils/validations.js";

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

function verifyDates(smallDate, bigDate) {
    const validDate = dateValidation(smallDate, bigDate);
    if (validDate) {
        throw { type: "unprocessable", message: validDate };
    }

    if (new Date(smallDateFormated) > new Date(bigDateFormated)) {
        throw { type: "unprocessable", message: "Smaller date cannot be greater than bigger date" };
    }
}

async function getFlight(origin, destination, smallDate, bigDate) {
    const validOrigin = await cityValidation(origin);
    const validDestination = await cityValidation(destination);

    if (!validOrigin || !validDestination) {
        throw { type: "notFound", message: "City not found" };
    }

    if (origin === destination) {
        throw { type: "conflict", message: "Origin and destination cannot be the same" };
    }

    if ((smallDate || bigDate) && !((smallDate && bigDate))) {
        throw { type: "unprocessable", message: "Both dates must be passed together" };
    }

    if( smallDate || bigDate) {
        verifyDates(smallDate, bigDate);
    }

    const flights = await flightsRepository.select(origin, destination, smallDate, bigDate);
    return flights;
};

const flightsService = { create, getFlight };
export default flightsService;