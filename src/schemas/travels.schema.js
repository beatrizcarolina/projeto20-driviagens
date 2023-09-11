import joi from "joi";

export const travelSchema = joi.object({
    passengerId: joi.number().integer().required(),
    flightId: joi.number().integer().required(),
});