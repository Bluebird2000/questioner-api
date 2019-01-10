import meetupquestionValidation from '../models/question';

const questions = [
  {
    id: 1,
    meetupId: 2,
    createdBy: 1,
    title: 'React summit',
    createdOn: new Date(),
    body: 'question body.',
    upvotes: 0,
    downvotes: 0,
  },
  {
    id: 2,
    meetupId: 2,
    createdBy: 1,
    title: 'React summit',
    createdOn: new Date(),
    body: 'question body',
    upvotes: 0,
    downvotes: 0,
  },
];
export default {
  createQuestion(req, res) {
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
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
    };
    questions.push(data);
    res.status(201)
      .send({
        status: 201,
        data,
      });
  },

  meetupQuestion(req, res) {
    const data = questions.find(question => question.id === parseInt(req.params.id));
    if (!data) {
      res.status(404)
        .send({
          status: 404,
          error: 'question with the requested id does not exist',
        });
      return;
    }
    res.status(200)
      .send({
        status: 200,
        data,
      });
  },

  upvoteQuestion(req, res) {
    const data = questions.find(question => question.id === parseInt(req.params.id));
    if (!data) {
      res.status(404)
        .send({
          status: 404,
          error: 'question with the id does not exist',
        });
    } else {
      data.upvotes = req.body.upvotes;
      res.status(200).send({
        status: 200,
        data,
      });
    }
  },

  downvoteQuestion(req, res) {
    const data = questions.find(question => question.id === parseInt(req.params.id));
    if (!data) {
      res.status(404)
        .send({
          status: 404,
          error: `question with the id ${req.params.id} does not exist`,
        });
      return;
    }
    data.downvotes = req.body.downvotes;
    res.status(200).send({
      status: 200,
      data,
    });
  },
};
