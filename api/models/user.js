import Joi from 'joi';

const userValidation = (qUsers) => {
  const userSchema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    othername: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phoneNumber: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
    // isAdmin: Joi.string().required(),
  };
  return Joi.validate(qUsers, userSchema);
};
module.exports = userValidation;
