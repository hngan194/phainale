const joi = require('joi');

const categoryValidator = joi.object({
    name: joi.string().required().min(5).max(255),
    slug : joi.string().required().min(5).max(255),
});

module.exports = {categoryValidator};