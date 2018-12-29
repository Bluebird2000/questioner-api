import Joi from 'joi';

const meetupValidation = (createMeetup) => {
  const meetupSchema = {
    createdOn: Joi.required(),
    location: Joi.string().min(2).max(250).required(),
    topic: Joi.string().min(3).max(100).required(),
    happeningOn: Joi.required(),
    tags: Joi.required(),
  };
  return Joi.validate(createMeetup, meetupSchema);
};
module.exports = meetupValidation;
