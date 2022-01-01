const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server/server');

beforeAll(async() => { // Test DB connection before the tests
    const url = 'mongodb+srv://sabin2000:123mini123@cluster0.xcriw.mongodb.net/electricHouseholds?retryWrites=true&w=majority';
    return await mongoose.connect(url);
});

describe('Authentication Test Suite', () => {

    test('Register Admin on /post route. Should respond with a 201 status code', async () => {
        const data = [{username: 'testadmin', emailAddress: 'testadmioijiojoin200@gmail.com', password: 'test123455', confirmPassword: 'test123455'}];

        for(const body of data) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(body);
            return expect(response.statusCode).toBe(201);
        }
    });

  

})