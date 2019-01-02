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
    return res.status(400).send({ status: 400, error: err });
  }
  const data = {
    id: meetups.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
    return res.status(422).send({ status: 422, error: 'please provide a valid meetup date' });
  }
  if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
    return res.status(422).send({ status: 422, error: 'please provide a future meetup date not a past date' });
  }
  meetups.push(data);
  return res.status(200).send({ status: 200, data: [data] });
};

exports.get_all_meetups = (req, res) => {
  res.status(200)
    .send({
      status: 200,
      meetups: [meetups],
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
      meetup: [meetup],
    });
};

exports.update_single_meetup = (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id));
  const { error } = meetupValidation(req.body);
  if (!meetup) return res.status(404).send({ status: 404, error: `Meetup with id: ${req.params.id} does not exist` });
  if (error) {
    const e = error.details[0].message;
    return res.status(400).send({ status: 400, error: e });
  }

  if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
    return res.status(422).send({ status: 422, error: 'please provide a valid meetup date' });
  }

  if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
    return res.status(422).send({ status: 422, error: 'please provide a future meetup date not a past date' });
  }
  meetup.createdOn = req.body.createdOn;
  meetup.location = req.body.location;
  meetup.topic = req.body.topic;
  meetup.happeningOn = req.body.happeningOn;
  meetup.tags = req.body.tags;
  return res.status(200).send({ status: 200, meetup: [meetup] });
};

exports.delete_single_meetup = (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id));
  if (!meetup) {
    return res.status(404).send({ status: 404, error: `Meetup with the given ID: ${req.params.id} does not exist` });
  }
  return res.status(200)
    .send({
      status: 200,
      meetup: [meetup],
    });
};
