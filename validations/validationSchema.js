const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(255).required()
})

module.exports = {
    userSchema
}
