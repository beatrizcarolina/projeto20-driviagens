import joiBase from "joi";
import joiDate from "@joi/date";
const joi = joiBase.extend(joiDate);

export const dateQuerySchema = joi.object({
    smallDate: joi.date().format("DD-MM-YYYY").required(),
    bigDate: joi.date().format("DD-MM-YYYY").required(),
});