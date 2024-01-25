// tests/controllers.test.js
const request = require('supertest');
const app = require('../your-express-app'); // Replace with the actual path to your Express app

describe('Authentication Endpoint Tests', () => {
  test('POST /login with valid credentials should return an access token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  test('POST /login with invalid credentials should return 401', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });
});

describe('Parcel Endpoint Tests', () => {
  let accessToken;

  beforeAll(async () => {
    // Log in and get the access token before running parcel-related tests
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password123' });

    accessToken = loginResponse.body.accessToken;
  });

  test('POST /parcels with valid data should create a parcel', async () => {
    const response = await request(app)
      .post('/parcels')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipient: 'John Doe',
        recipient_phoneNo: '1234567890',
        recipient_name: 'John',
        recipient_address: '123 Main St',
        date_and_time: '2023-01-01',
        status: 'Pending',
        size: 'Small',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  test('GET /parcels should return an array of parcels', async () => {
    const response = await request(app)
      .get('/parcels')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('PUT /parcels/:parcelId/deliver should update the parcel status to "Delivered"', async () => {
    // Assume there is at least one parcel created by the user
    const userParcelsResponse = await request(app)
      .get('/parcels')
      .set('Authorization', `Bearer ${accessToken}`);

    const parcelId = userParcelsResponse.body[0].id;

    const response = await request(app)
      .put(`/parcels/${parcelId}/deliver`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Delivered');
  });

  test('PUT /parcels/:parcelId/deliver with invalid parcelId should return 404', async () => {
    const response = await request(app)
      .put('/parcels/9999/deliver')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(404);
  });
});
