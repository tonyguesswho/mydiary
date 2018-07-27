const request = require('supertest');

describe('GET /api/v1/entries', () => {
  it('respond with json containing a list of all diary entries', done => {
    request('localhost:3000')
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('GET /api/v1/entries/id', () => {
  it('respond with json a diary entry with the id', done => {
    request('localhost:3000')
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
