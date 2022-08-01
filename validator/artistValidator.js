const Joi = require('Joi').extend(require('@joi/date'))

const addartistSchema = Joi.object({
    name: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    dob: Joi.date().format("YYYY-MM-DD").raw().required(),
    bio: Joi.string().min(3).message("You have to write atleast 3 letters").required()
})

module.exports = { addartistSchema }