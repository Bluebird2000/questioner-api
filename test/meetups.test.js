import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../api/server';

chai.should();

chai.use(chaiHttp);
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
});
