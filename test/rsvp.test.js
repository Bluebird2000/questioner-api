import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../server';

chai.should();

chai.use(chaiHttp);
describe('POST / Rsvps', () => {
  it('should return status code 200 if meetup exist and create rsvp', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/2/rsvps')
      .send({
        createdOn: new Date().getFullYear(),
        location: 'Ojodu berger',
        topic: 'Developer fest',
        happeningOn: '2019-01-03',
        tags: ['laravel', 'Django', 'python'],
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status code 404 if meetup record to rsvp for does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/1002/rsvps')
      .send({
        createdOn: new Date().getFullYear(),
        location: 'Ojodu berger',
        topic: 'Developer fest',
        happeningOn: '2019-01-03',
        tags: ['laravel', 'Django', 'python'],
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
