import passengersRepository from "../repositories/passengers.repository.js";

async function create(firstName, lastName) {
    return await passengersRepository.insert(firstName, lastName);
};

const passengersService = { create };
export default passengersService;