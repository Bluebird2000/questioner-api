import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

chai.should();
const userCredentials = {
  email: 'tester@questioner.com',
  password: 'default111',
};
let token = '';


chai.use(chaiHttp);

describe('GET / All meetup records', () => {
  it('it should return status code 200 and get list of created meetups', (done) => {
    chai.request(app)
      .get('/api/v1/meetups')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET / single meetup', () => {
  it('should return status code 200 if meetup record exist', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('DELETE / single meetup', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        if (err) throw err;
        token = res.body.data.token;
        res.should.have.status(200);
        done();
      });
  });
  it('should return status code 401 if unauthorized', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  // it('should return status code 404 if meetup to be deleted not found', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/meetups/-1')
  //     .set('token', `${token}`)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       done();
  //     });
  // });
  // it('should return status code 204 if meetup was deleted successful', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/meetups/1')
  //     .set('token', `${token}`)
  //     .end((err, res) => {
  //       res.should.have.status(204);
  //       done();
  //     });
  // });
});
