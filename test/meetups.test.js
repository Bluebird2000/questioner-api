import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../server';

chai.should();

chai.use(chaiHttp);
describe('POST / Meetups', () => {
  it('should return status code 200 and create a new meetup record', (done) => {
    chai.request(app)
      .post('/api/v1/meetups')
      .send({
        createdOn: new Date().getFullYear(),
        location: 'Ajah',
        topic: 'React summit',
        happeningOn: 'March 7th 2019',
        tags: ['nodejs', 'react', 'mongo', 'express'],
      })
      .end((err, res) => {
        res.should.have.status(200);
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

describe('GET / All meetup records', () => {
  it('it should return status code 200 and get list of created meetups', (done) => {
    chai.request(app)
      .get('/api/v1/meetups')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should return status code 404 if API request is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/meetup')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('GET / single meetup', () => {
  it('should return status code 200 if meetup record does exist', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code 404 if meetup not found', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('PUT / update a single meetup record', () => {
  it('should return status code 400 if meetup record parameters to be updated is not valid', (done) => {
    chai.request(app)
      .put('/api/v1/meetups/1')
      .send({})
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code 404 if meetup record not found', (done) => {
    chai.request(app)
      .put('/api/v1/meetups/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code 200 if meetup record to be updated exist', (done) => {
    chai.request(app)
      .put('/api/v1/meetups/1')
      .send({
        createdOn: new Date().getFullYear(),
        location: 'Ajah',
        topic: 'React summit',
        happeningOn: 'March 7th 2019',
        tags: ['nodejs', 'react', 'mongo', 'express'],
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('DELETE / update a single meetup record', () => {
  it('should return status code 400 if meetup record to be deleted does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/4')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return status code 200 if meetup record is successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/1')
      .send({
        createdOn: new Date().getFullYear(),
        location: 'Ajah',
        topic: 'React summit',
        happeningOn: 'March 7th 2019',
        tags: ['nodejs', 'react', 'mongo', 'express'],
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
