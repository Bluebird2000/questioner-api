import meetupquestionValidation from '../models/meetupquestion';

const questions = [
  {
    id: 1,
    meetupId: 2,
    createdBy: 1,
    title: 'React summit',
    createdOn: new Date(),
    body: 'question body.',
    votes: 0,
  },
  {
    id: 2,
    meetupId: 2,
    createdBy: 1,
    title: 'React summit',
    createdOn: new Date(),
    body: 'question body',
    votes: 0,
  },
];
exports.create_meetup_question = (req, res) => {
  const { error } = meetupquestionValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    res.status(400)
      .send({
        status: 400, error: err,
      });
    return;
  }
  const data = {
    id: questions.length + 1,
    meetupId: req.body.meetupId,
    createdBy: req.body.createdBy,
    createdOn: req.body.createdOn,
    title: req.body.title,
    body: req.body.body,
    votes: req.body.votes,
  };
  questions.push(data);
  res.status(200)
    .send({
      status: 200,
      data,
    });
};
