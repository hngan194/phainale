const Joi = require('joi');

const changePasswordValidator = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')),
});

module.exports = { changePasswordValidator };
