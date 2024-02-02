const Joi = require('joi');


const menuItemSchema = Joi.object({
    name: Joi.string().min(1).max(60).required(),
    price: Joi.number().min(0.01).required(),
    description: Joi.string().min(1).required(),
    image: Joi.string().min(1).max(100).required()
});

module.exports = {
    menuItemSchema
};