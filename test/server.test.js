// const express = require('express');

// const app = express();

const request = require('supertest');

const { assert } = require('chai').assert;

const { app } = require('../build/bundle.js');

describe('GET /', () => {
  it('responds with json', () => {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        assert(response.body.message, 'Hello, world');
      });
  });
});

describe('Post routes', () => {
  it('Adds a new diary entry', () => {});
});
