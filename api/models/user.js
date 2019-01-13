import Joi from 'joi';

const userValidation = (qUsers) => {
  const userSchema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    othername: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone_number: Joi.string().trim().regex(/^[0-9]{7,11}$/).required(),
    username: Joi.string().min(3).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required(),
  };
  return Joi.validate(qUsers, userSchema);
};
export default userValidation;
