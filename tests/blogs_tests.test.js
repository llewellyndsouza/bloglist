const request = require('supertest')
const app = require('../app')


request(app).get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)