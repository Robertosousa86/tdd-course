const request = require('supertest');

const app = require('../src/app');

describe('User Registration', () => {
  it('should returns 200 OK when sing-up request is valid ', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'username',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('should returns success message whem sing-up request is valid ', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'username',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created.');
        done();
      });
  });
});
