import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../server';

const should = chai.should();
chai.use(chaiHttp);
describe('POST / Users', () => {
  it('should return status code 200 and create a new user account', (done) => {
    const newUser = {
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
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return status code 400 if api parameters are not valid', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
