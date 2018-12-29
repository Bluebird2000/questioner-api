import meetupValidation from '../models/meetup';

const createMeetup = [
  {
    id: 1,
    createdOn: new Date().getFullYear(),
    location: 'Ajah',
    topic: 'React summit',
    happeningOn: 'March 7th 2019',
    tags: ['nodejs', 'react', 'mongo', 'express'],
  },
  {
    id: 2,
    createdOn: new Date().getFullYear(),
    location: 'Ojodu berger',
    topic: 'Developer fest',
    happeningOn: 'January 22nd 2019',
    tags: ['laravel', 'Django', 'python'],
  },
];
exports.create_meetup = (req, res) => {
  const { error } = meetupValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    res.status(400)
      .send({
        status: 400, error: err,
      });
    return;
  }
  const data = {
    id: createMeetup.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  createMeetup.push(data);
  res.status(200)
    .send({
      status: 200,
      data,
    });
};
