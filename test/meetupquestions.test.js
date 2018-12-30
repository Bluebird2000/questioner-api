import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../server';

chai.should();

chai.use(chaiHttp);
describe('POST / Meetup question', () => {
  it('should return status code 200 and create a new meetup question', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        meetupId: 2,
        createdBy: 1,
        title: 'React summit',
        createdOn: new Date(),
        body: 'question body.',
        votes: 0,
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status code 400 if meetup question parameters are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
