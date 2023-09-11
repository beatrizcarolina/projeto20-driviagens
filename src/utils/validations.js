import passengerRepository from "../repositories/passengers.repository.js";
import citiesRepository from "../repositories/cities.repository.js";
import flightsRepository from "../repositories/flights.repository.js";
import { dateSchema } from "../schemas/dates.schema.js";

export async function passengerValidation(passengerId) {
    const passenger = await passengerRepository.selectById(passengerId);

    if(passenger) {
        return true;
    }

    return false;
};

export async function cityValidation(cityId) {
    const city = await citiesRepository.selectById(cityId);

    if(city) {
        return true;
    }

    return false;
};

export async function flightsValidation(flightId) {
    const flight = await flightsRepository.selectById(flightId);

    if(flight) {
        return true;
    }

    return false;
}

export function dateValidation(smallDate, bigDate) {
    const validation = dateSchema.validate({ smallDate, bigDate }, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return errors;
    }

    return false;
}
