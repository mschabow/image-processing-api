import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('gets the api/image endpoint with valid name, size, and format', async () => {
    const response = await request.get(
      '/api/images?name=fjord.jpg&width=600&height=800&format=png'
    );
    expect(response.status).toBe(200);
  });
  it('gets the api/image endpoint with valid name, size, no format', async () => {
    const response = await request.get(
      '/api/images?name=fjord.jpg&width=600&height=800'
    );
    expect(response.status).toBe(200);
  });
});
