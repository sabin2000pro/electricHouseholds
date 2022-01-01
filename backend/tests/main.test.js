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
        const data = [{username: 'newadmin123', emailAddress: 'newadmin123@gmail.com', password: 'newadmin123', confirmPassword: 'newadmin123'}];

        for(const body of data) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(body);
            return expect(response.statusCode).toBe(201);
        }
    });

    // Test Case 2 - Admin Register Invalid Data
    test('Register Admin with Invalid Data. Should respond with 400 Bad Request', async () => {
        const invalidBodyData = [{username: "0", emailAddress: "122239jdf", password: '1'}];

        for(const bodyData of invalidBodyData) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(bodyData);
            return expect(response.statusCode).toBe(400);
        }
    })

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

        test('Login Admin - Invalid E-mail Address and Invalid Password', async () => {

        });

        
    });

    // Test Suite 2
describe("Appliances Test Suite. - CRUD Operations", () => {

    // Test Case 1
    test("Create Appliance. Should return a 201 Created Status Code", async () => {
        const applianceBodyData = [{"name": "Test Appliance", "image": "tesurl", "description": "A test appliance"}];

        for(const data of applianceBodyData) {
            const response = await request(server).post('/api/v1/appliances/create-appliance').send(data);
            return expect(response.statusCode).toBe(201);
        }
    });

    test('Fetch All Appliances. Should return a 200 OK Status Code with list of appliances created', async () => {
        const response = await request(server).get('/api/v1/appliances/fetch-appliances');
        return expect(response.statusCode).toBe(200);
    });

    test('Edit Appliance By ID. Should return a 200 OK status code', async () => {

    });

    test('Delete All Appliances. Should return a 204 NO CONTENT status code', async () => {

    });

    test('Delete Appliance by Single ID. Should return a 201 CREATED Status Code', async () => {

    })

    test('Sort all appliances in ascending order. Should return with a 200 OK Status code', async () => {

    })

    describe('User Preferences Testing Suite.', () => {


        // Test Case 1 for User Preferences - POST Request
    
        test('Create a User Timeslot Preference', async () => {
    
        })
    
        // Test Case 2 - GET Request
        test('Fetch All User Preferences', async () => {

        });
    })
});

});