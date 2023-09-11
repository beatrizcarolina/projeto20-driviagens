import { passengerValidation, flightValidation } from "../utils/validations.js";
import travelsRepository from "../repositories/travel.repository.js";

async function create(passengerId, flightId) {
    const validPassenger = await passengerValidation(passengerId);
    const validFlight = await flightValidation(flightId);

    if (!validFlight || !validPassenger) {
        throw { type: "notFound", message: "Passenger or flight not found" };
    }

    return await travelsRepository.insert(passengerId, flightId);
};

const travelsService = { create };
export default travelsService;