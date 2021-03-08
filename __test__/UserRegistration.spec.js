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
  const postValidUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@email.com',
      password: 'P4ssword',
    });
  };

  it('should returns 200 OK when sing-up request is valid ', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it('should returns success message whem sing-up request is valid ', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created.');
  });

  it('should saves the user to database ', async () => {
    await postValidUser();
    // query user table
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('should saves the user name and email to database ', async () => {
    await postValidUser();
    const userList = await User.findAll();
    // query user table
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@email.com');
  });

  it('should hashes the password in database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    // query user table
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });

  it('should returns 400 when user is null', async () => {
    const response = await request(app).post('/api/1.0/users').send({
      username: null,
      email: 'user1@email.com',
      password: 'P4ssword',
    });
    expect(response.status).toBe(400);
  });
});
