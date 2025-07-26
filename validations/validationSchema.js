const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(255).required()
})

const folderSchema = Joi.object({
    name: Joi.string().min(3).max(20).required()
})

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

module.exports = {
    userSchema,
    folderSchema,
    idSchema
}
