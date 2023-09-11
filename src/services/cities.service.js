import citiesRepository from "../repositories/cities.repository.js";

async function create(name) {
    const city = await citiesRepository.selectByName(name);
    if(city) {
        throw { type: "conflict", message: "City already registered" };
    }
    return await citiesRepository.insert(name);
};

const citiesService = { create };
export default citiesService;