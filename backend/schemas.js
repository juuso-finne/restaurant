const Joi = require('joi');

const menuItemSchema = Joi.object({
    name: Joi.string().max(60).required(),
    price: Joi.number().min(0.01).required(),
    description: Joi.string().required(),
    image: Joi.string().max(100).required()
});

const signUpInfoSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().min(12).max(25).required()
});

const loginInfoSchema = Joi.object({
    email: Joi.string().max(50).email().required(),
    password: Joi.string().required()
});

module.exports = {
    loginInfoSchema,
    menuItemSchema,
    signUpInfoSchema
};