const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const { User, BlacklistToken } = require('../models');

describe('User Auth Flow', () => {
  const testUser = {
    email: 'testuser@example.com',
    password: 'testpassword',
    name: 'Test User',
  };

  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
  });

  it('should log in the user and return JWT token', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should logout the user', async () => {
    const res = await request(app)
      .get('/users/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await BlacklistToken.destroy({ where: {}, force: true });
    await User.destroy({ where: { email: testUser.email }, force: true });
    await sequelize.close();
  });
});
