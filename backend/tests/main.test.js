const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server/server');

beforeAll(async() => { // Test DB connection before the tests
    const url = 'mongodb+srv://sabin2000:123mini123@cluster0.xcriw.mongodb.net/electricHouseholds?retryWrites=true&w=majority';
    return await mongoose.connect(url);
});

describe('Authentication Test Suite', () => {

    // Test Case 1
    test('Register Admin on /post route. Should respond with a 201 status code', async () => {
        const data = [{username: 'testadmin', emailAddress: 'testadmioijiojoin200@gmail.com', password: 'test123455', confirmPassword: 'test123455'}];

        for(const body of data) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(body);
            return expect(response.statusCode).toBe(201);
        }
    });

    test('Fetch All Admins. Should respond with a 200 OK status code', async () => {
        const theResponse = await request(server).get('/api/v1/auth/fetch-admins').send();
        return expect(theResponse.statusCode).toBe(200);
    });

    test('Login Admin. Should return with a status code of 200 OK', async () => {
        const data = [{emailAddress: 'testadmin123@gmail.com', password: '123mini123lol'}];

        for(const body of data) {
            const response = await request(server).post('/api/v1/auth/login-admin').send(body);
            return expect(response.statusCode).toBe(200);
        }
    });
});

describe("Appliances Test Suite. - CRUD Operations", () => {

    // Test Case 1
    test("Create Appliance. Should return a 201 Created Status Code", async () => {

    });

    

});