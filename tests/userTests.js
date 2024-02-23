// controller.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your Express app is named 'app'
const User = require('../models/User'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');

describe('Controller Tests', () => {
  // Tests for getAllUsers function
  it('should return all users', async () => {
    const response = await request(app).get('/users').expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Tests for getUserById function
  it('should return user by ID', async () => {
    const newUser = new User({ email: 'test@example.com', password: 'password' });
    await newUser.save();

    const response = await request(app).get(`/users/${newUser._id}`).expect(200);
    expect(response.body.email).toBe('test@example.com');
  });

  // Tests for registerUser function
  it('should register a new user', async () => {
    const userData = { email: 'newuser@example.com', password: 'password' };

    const response = await request(app)
      .post('/register')
      .send(userData)
      .expect(201);

    expect(response.body.email).toBe('newuser@example.com');
  });

  // Tests for loginUsers function
  it('should login a user and return a token', async () => {
    const newUser = new User({ email: 'test@example.com', password: 'password' });
    await newUser.save();

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200);

    expect(response.body.token).toBeTruthy();

    // Verify token
    const decoded = jwt.verify(response.body.token, process.env.SECRETE_KEY);
    expect(decoded.id).toBe(newUser._id.toString());
    expect(decoded.name).toBe('test@example.com');
  });

  // Test for invalid email or password during login
  it('should return 401 for invalid email or password during login', async () => {
    await request(app)
      .post('/login')
      .send({ email: 'nonexistent@example.com', password: 'password' })
      .expect(401);

    await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'invalidpassword' })
      .expect(401);
  });
});
