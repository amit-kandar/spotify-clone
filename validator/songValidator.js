const Joi = require('Joi').extend(require('@joi/date'))


const addSongSchema = Joi.object({
    name: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    releasedate: Joi.date().format("YYYY-MM-DD").raw().required(),
    artistId: Joi.number().integer().required()
})

module.exports = { addSongSchema }