import meetupValidation from '../models/meetup';

const meetups = [
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
    id: meetups.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  meetups.push(data);
  res.status(200)
    .send({
      status: 200,
      data,
    });
};

exports.get_all_meetups = (req, res) => {
  res.status(200)
    .send({
      status: 200,
      meetups,
    });
};

exports.get_single_meetup = (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id));
  if (!meetup) {
    res.status(404)
      .send({
        status: 404,
        error: `Meetup with the given ID: ${req.params.id} does not exist`,
      });
    return;
  }
  res.status(200)
    .send({
      status: 200,
      meetup,
    });
};

exports.update_single_meetup = (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id));
  const { error } = meetupValidation(req.body);
  if (!meetup) {
    return res.status(404)
      .send({
        status: 404,
        error: `Meetup with the given ID: ${req.params.id} does not exist`,
      });
  }
  if (error) {
    const err = error.details[0].message;
    return res.status(400)
      .send({
        status: 400,
        error: err,
      });
  }
  meetup.createdOn = req.body.createdOn;
  meetup.location = req.body.location;
  meetup.topic = req.body.topic;
  meetup.happeningOn = req.body.happeningOn;
  res.status(200)
    .send({
      status: 200,
      meetup,
    });
};
