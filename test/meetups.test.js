import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

chai.should();
const userCredentials = {
  email: 'tester@questioner.com', 
  password: 'default111'
}
let token = '';

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
