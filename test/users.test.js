import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

const should = chai.should();

chai.use(chaiHttp);
describe('POST / Users', () => {
  it('should return status code 201 and create a new user account', (done) => {
    const user = {
      firstname: 'Ahmad',
      lastname: 'Lateef',
      othername: 'Olamilekan',
      email: 'Bluebird20@gmail.com',
      phoneNumber: '08097012219',
      username: 'Bluebird2000',
      password: 'default111',
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

