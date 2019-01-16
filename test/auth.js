import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

const should = chai.should();

chai.use(chaiHttp);

const user = {
  firstname: 'Ahmad',
  lastname: 'Lateef',
  othername: 'Olamilekan',
  email: 'tester2000@gmail.com',
  phoneNumber: '08097012219',
  username: 'Bluebird2000',
  password: 'default111',
};

describe('POST / Users', () => {
  it('should return status code 201 and create a new user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

// describe('POST / User login', () => {
//   it('should return 200 status and login an existing user', (done) => {
//     let loginInfo = {
//       email: user.email,
//       password: user.password
//     }
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(loginInfo)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       }) 
//   });
// });

