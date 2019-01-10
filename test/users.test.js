import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

const should = chai.should();

chai.use(chaiHttp);

describe('POST / Users', () => {
  it('should return status code 200 and create a new user account', (done) => {
    const newUser = {
      firstname: 'Ahmad',
      lastname: 'Lateef',
      othername: 'Olamilekan',
      email: 'lateefahmad3868@gmail.com',
      phoneNumber: '08097012219',
      username: 'Bluebird2000',
      password: 'default111',
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status code 400 if api parameters are not valid', (done) => {
    const newUser = ({});
    chai.request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('GET / Users profile', () => {
  it('should return status code 200 if user does exist', (done) => {
    const user = {
      id: 1,
      firstname: 'Ahmad',
      lastname: 'Lateef',
      othername: 'Olamilekan',
      email: 'lateefahmad3868@gmail.com',
      phoneNumber: '08097012219',
      username: 'Bluebird2000',
      password: 'default111',
      registered: new Date(),
      isAdmin: true,
    };
    chai.request(app)
      .get('/api/v1/users/1')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return status code 404 if user record not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('PUT / update user profile', () => {
  it('should return status code 400 if user profile parameters to be updated is not valid', (done) => {
    chai.request(app)
      .put('/api/v1/users/1')
      .send({})
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code 404 if user record not found', (done) => {
    chai.request(app)
      .put('/api/v1/users/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code 200 if user record was successfully updated', (done) => {
    chai.request(app)
      .put('/api/v1/users/1')
      .send({
        firstname: 'Ahmad',
        lastname: 'Lateef',
        othername: 'Olamilekan',
        email: 'lateefahmad3868@gmail.com',
        phoneNumber: '08097012219',
        username: 'Bluebird2000',
        password: 'default111',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
