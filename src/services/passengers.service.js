import passengersRepository from "../repositories/passengers.repository.js";

async function create(firstName, lastName) {
    return await passengersRepository.insert(firstName, lastName);
};

async function getPassengerFlights(name) {
    const passengerFlights = await passengersRepository.selectFlights(name);

    if (passengerFlights.length > 10) {
        throw { type: "internal", message: "Too many results" };
    }

    return passengerFlights;
};

const passengersService = { create, getPassengerFlights };
export default passengersService;