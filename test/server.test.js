// const chai = require('chai');

const expect = require('chai').expect;

const supertest = require('supertest');

// const chaiHttp = require('chai-http');

// const request = require('supertest');

const { app } = require('./../build/bundle');

const entries = require('../data/data');

const server = supertest.agent('https://localhost:3000');

describe('GET all entries', () => {
  it('should get all entries', () => {
    server
      .get('/api/v1/entries')
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({ a: 'd' });
      });
  });
});
