import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const flightSchema = joi.object({
    origin: joi.number().integer().required(),
    destination: joi.number().integer().required(),
    date: joi.date().format("DD-MM-YYYY").required(),
});