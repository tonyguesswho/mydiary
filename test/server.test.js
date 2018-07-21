const request = require('supertest');

// const { assert } = require('chai').assert;
// const { expect } = require('chai').expect;

// const app = require('../build/bundle.js');

describe('GET /api/v1/entries', () => {
  it('respond with json containing a list of all diary entries', done => {
    request('localhost:3000')
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /api/v1/entries/id', () => {
  it('respond with json a diary entry with the id', done => {
    request('localhost:3000')
      .get('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
