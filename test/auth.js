import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

const should = chai.should();

chai.use(chaiHttp);

const userCredentials = {
  email: 'tester@questioner.com', 
  password: 'default111'
}
let token = '';
let randNum = Math.floor(Math.random() * 125);
const user = {
  firstname: 'Ahmad',
  lastname: 'Lateef',
  othername: 'Olamilekan',
  email: `test${randNum}@example.com`,
  phoneNumber: '08097012219',
  username: 'Bluebird2000',
  password: 'default111',
};

before(function(done){
   chai.request(app)
    .post('/api/v1/auth/login')
    .send(userCredentials)
    .end(function(err, res){
      token = res.body.data.token;
      res.should.have.status(200)
      done();
    });
});

describe('Authentication route', ()=>{
  it('should return status 201 status and create a new user', (done)=>{
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.be.a('array');
        done();
      })    
  });
  it('should return 200 status and login an existing user', (done)=>{
    let loginInfo = {
      email: user.email,
      password: user.password
    }
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        done();
      })    
  }) 
})

