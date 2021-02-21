const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelie = require('../src/config/database');
const { sequelize } = require('../src/user/User');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  it('should returns 200 OK when sing-up request is valid ', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
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
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created.');
        done();
      });
  });

  it('should saves the user to database ', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((userlist) => {
          expect(userlist.length).toBe(1);
          done();
        });
      });
  });

  it('should saves the user name and email to database ', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((userlist) => {
          const savedUser = userlist[0];
          expect(savedUser.username).toBe('user1');
          expect(savedUser.email).toBe('user1@email.com');
          done();
        });
      });
  });
});
