const joi = require('joi');

const blogValidator = joi.object({
    title: joi.string().required().min(5).max(255).message({
        "string.empty" : "title không được để trống",
        "any.required" : "title là bắt buộc",
        "string.min" : "title phải có ít nhất {#limit} ký tự",
        "string.max" : "title không được vượt quá {#limit} ký tự",
    }),
    image: joi.string(),
    content: joi.string().required().min(50).message({
        "string.empty" : "content không được để trống",
        "any.required" : "content là bắt buộc",
        "string.min" : "content phải có ít nhất {#limit} ký tự",
    }),
    accountId: joi.string().required().min(5).message({
        "string.empty" : "accountId không được để trống",
        "any.required" : "accountId là bắt buộc",
    })
});

module.exports = {blogValidator}