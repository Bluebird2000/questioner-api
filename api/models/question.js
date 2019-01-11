import Joi from 'joi';

const meetupquestionValidation = (createMeetupQ) => {
  const meetupquestSchema = {
    meetupId: Joi.required(),
    createdOn: Joi.date().iso(),
    createdBy: Joi.required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    upvotes: Joi.required(),
    downvotes: Joi.required(),
  };
  return Joi.validate(createMeetupQ, meetupquestSchema);
};
module.exports = meetupquestionValidation;
