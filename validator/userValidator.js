const Joi = require('Joi')

const signupSchema = Joi.object({
    name: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    email: Joi.string().email().message('Invalid email').required()
})

const signinSchema = Joi.object({
    email: Joi.string().email().message('Invalid email').required()
})

module.exports = { signupSchema, signinSchema }