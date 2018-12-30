import Joi from 'joi';

const meetupquestionValidation = (createMeetupQ) => {
  const meetupquestSchema = {
    meetupId: Joi.required(),
    createdOn: Joi.required(),
    createdBy: Joi.required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    votes: Joi.required(),
  };
  return Joi.validate(createMeetupQ, meetupquestSchema);
};
module.exports = meetupquestionValidation;
