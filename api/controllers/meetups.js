import meetupValidation from '../models/meetup';

const meetups = [
  {
    id: 1,
    createdOn: new Date(),
    location: 'Ajah',
    topic: 'React summit',
    happeningOn: '2019-01-03',
    tags: ['nodejs', 'react', 'mongo', 'express'],
  },
  {
    id: 2,
    createdOn: new Date(),
    location: 'Ojodu berger',
    topic: 'Developer fest',
    happeningOn: '2019-04-03',
    tags: ['laravel', 'Django', 'python'],
  },
];

export default {
  createMeetup(req, res) {
    const { error } = meetupValidation(req.body);
    if (error) {
      const err = error.details[0].message;
      return res.status(400)
        .send({
          status: 400,
          error: err,
        });
    }
    const data = {
      id: meetups.length + 1,
      createdOn: new Date(),
      location: req.body.location,
      topic: req.body.topic,
      happeningOn: req.body.happeningOn,
      tags: req.body.tags,
    };
    if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
      return res.status(422)
        .send({
          status: 422,
          error: 'please provide a valid meetup date',
        });
    }
    if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
      return res.status(422)
        .send({
          status: 422,
          error: 'please provide a future meetup date not a past date',
        });
    }
    meetups.push(data);
    return res.status(201).send({ status: 201, data });
  },

  getMeetups(req, res) {
    res.status(200)
      .send({
        status: 200,
        data: meetups,
      });
  },

  singleMeetup(req, res) {
    const data = meetups.find(
      meetup => meetup.id === parseInt(req.params.id),
    );
    if (!data) {
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
        data,
      });
  },

  upcomingMeetups(req, res) {
    const now = new Date().getTime();
    const upComingMeetups = meetups.filter(
      meetup => new Date(meetup.happeningOn).getTime() >= now,
    );
    if (!upComingMeetups.length) {
      res.status(404).send({
        status: 404,
        error: 'There are no upcoming meetups',
      });
    } else {
      res.status(200).send({
        status: 200,
        data: upComingMeetups,
      });
    }
  },

  updateMeetup(req, res) {
    const data = meetups.find(
      meetup => meetup.id === parseInt(req.params.id),
    );
    const { error } = meetupValidation(req.body);
    if (!data) {
      return res.status(404)
        .send({
          status: 404,
          error: `Meetup with id: ${req.params.id} does not exist`,
        });
    }
    if (error) {
      const e = error.details[0].message;
      return res.status(400)
        .send({
          status: 400,
          error: e,
        });
    }

    if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
      return res.status(422)
        .send({
          status: 422,
          error: 'please provide a valid meetup date',
        });
    }

    if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
      return res.status(422)
        .send({
          status: 422,
          error: 'please provide a future meetup date not a past date',
        });
    }
    data.createdOn = new Date();
    data.location = req.body.location;
    data.topic = req.body.topic;
    data.happeningOn = req.body.happeningOn;
    data.tags = req.body.tags;
    return res.status(200)
      .send({
        status: 200,
        data,
      });
  },
  deleteMeetup(req, res) {
    const data = meetups.find(
      meetup => meetup.id === parseInt(req.params.id),
    );
    if (!data) {
      return res.status(404)
        .send({
          status: 404,
          error: `Meetup with the given ID: ${req.params.id} does not exist`,
        });
    }
    const del = meetups.indexOf(data);
    meetups.splice(del, 1);
    return res.status(204)
      .send({
        meetups,
      });
  },
};
