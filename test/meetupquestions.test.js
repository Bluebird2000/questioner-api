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
        upvotes: 0,
        downvotes: 0,
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

describe('GET / Each meetup question records', () => {
  it('should return status code 404 if meetup question does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/questions/6')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return status code 200 if meetup question exist', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('PUT / upvote meetup questions', () => {
  it('should return status code 404 if meetup question to be upvoted does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/questions/upvote/10')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return status code 200 if meetup question exist', (done) => {
    chai.request(app)
      .put('/api/v1/questions/upvote/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('PUT / downvotes meetup questions', () => {
  it('should return status code 404 if meetup question to be downvoted does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/questions/downvote/10')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return status code 200 if meetup question exist', (done) => {
    chai.request(app)
      .put('/api/v1/questions/downvote/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
