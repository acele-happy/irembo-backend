// controller.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your Express app is named 'app'
const Url = require('../models/Url'); // Assuming you have a Url model defined

describe('Controller Tests', () => {
  it('should return "Helloo brotherr" from text route', async () => {
    const response = await request(app).get('/text');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Helloo brotherr');
  });

  it('should shorten a URL and return a short URL', async () => {
    const longUrl = 'https://example.com';
    const customAlias = 'exampleAlias';

    const response = await request(app)
      .post('/shorten')
      .send({ longUrl, customAlias })
      .expect(200);

    expect(response.body.shortUrl).toBeTruthy();
  });

  it('should return a 409 status code if custom alias already exists', async () => {
    const longUrl = 'https://example.com';
    const customAlias = 'existingAlias'; // Assuming this alias already exists in the database

    const response = await request(app)
      .post('/shorten')
      .send({ longUrl, customAlias })
      .expect(409);

    expect(response.text).toBe('Custom alias already exists');
  });

  it('should redirect to the long URL when provided with a valid alias', async () => {
    const url = new Url({ longUrl: 'https://example.com', alias: 'validAlias' });
    await url.save();

    const response = await request(app).get('/redirect/validAlias').expect(200);

    expect(response.text).toBe('https://example.com');
  });

  it('should return a 404 status code if alias not found', async () => {
    await Url.deleteMany(); // Clearing any existing URLs

    const response = await request(app).get('/redirect/nonExistingAlias').expect(404);

    expect(response.text).toBe('Alias not found');
  });

  it('should return URLs sorted by createdAt in descending order', async () => {
    // Assuming you have some URLs in the database for testing
    const userId = '123456'; // Assuming this is a valid user ID
    const url1 = new Url({ userId, longUrl: 'https://example.com/1', alias: 'url1' });
    const url2 = new Url({ userId, longUrl: 'https://example.com/2', alias: 'url2' });
    await url1.save();
    await url2.save();

    const response = await request(app).get('/urls/userId:123456').expect(200);

    // Assuming response.body is an array of URLs
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].longUrl).toBe('https://example.com/2');
    expect(response.body[1].longUrl).toBe('https://example.com/1');
  });
});
