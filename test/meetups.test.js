import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../server';

chai.should();

chai.use(chaiHttp);
describe('POST / Meetups', () => {
  it('should return status code 200 and create a new meetup record', (done) => {
    chai.request(app)
      .post('/api/v1/meetups')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return status code 400 if api parameters are not valid', (done) => {
    chai.request(app)
      .post('/api/v1/meetups')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
