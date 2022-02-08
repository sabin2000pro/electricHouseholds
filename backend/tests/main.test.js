const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server/server');

beforeAll(async() => { // Test DB connection before the tests
    const url = 'mongodb+srv://sabin2000:123mini123@cluster0.xcriw.mongodb.net/electricHouseholds?retryWrites=true&w=majority';
    return await mongoose.connect(url);
});

describe('Authentication Test Suite', () => {

   

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

   

    test('Login Admin - Invalid E-mail Address and Invalid Password', async () => {
        const invalidLoginData = [{username: "unknown", password: "unknown"}];

        for(const loginData of invalidLoginData) {
            const serverResponse = await request(server).post('/api/v1/auth/login-admin').send(loginData);
            return expect(serverResponse.statusCode).toBe(401)
        }
    });

    test('Login Admin - Missing Password', async () => {
        const missingPassword = [{password: ''}];

        for(const data of missingPassword) {
            const response = await request(server).post('/api/v1/auth/login-admin').send(data);
            return expect(response.statusCode).toBe(401);
        }
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
        const editBodyData = [{}]
    });

    test('Delete All Appliances. Should return a 204 NO CONTENT status code', async () => {
        const response = await request(server).delete('/api/v1/appliances/delete-appliances');
        return expect(response.statusCode).toBe(204);
    });

    test('Delete Appliance by Single ID. Should return a 201 CREATED Status Code', async () => {

    })

    test('Sort all appliances in ascending order. Should return with a 200 OK Status code', async () => {

    })

    describe('User Preferences Testing Suite.', () => {

        // Test Case 1 for User Preferences - POST Request
    
      
        // Test Case 2 - GET Request
        test('Fetch All User Preferences', async () => {
            const response = await request(server).get('/api/v1/preferences/fetch-preferences');
            return expect(response.statusCode).toBe(200);
        });

        test("Delete all user preferences", async () => {
            const response = await request(server).delete('/api/v1/preferences/delete-preferences');
            return expect(response.statusCode).toBe(204);
        });
    })
});
});

describe('User Comments - Testing Suite', () => {

    test('View All Comments - Should return 200 OK status Code', async () => {

    });

    test('Create Single Comment - Should return 201 Created Status Code', async () => {

    });

    test('Create Single Comment with Invalid Data - Should return with a 400 Bad Request ', async () => {

    });

    test('Delete Single Comment - Should return 204 No Content Code', async () => {

    });
})

describe('Algorithms Review - Testing Suite', () => {
    test('View All Reviews. Should Return a 200 OK Status Code', async () => {

    })

    test('Create Review. Should return a 201 Created Status Code', async () => {

    });

    test('Create Invalid Review with missing data. Should return a 404 not found code', async () => {

    });

    test('Create Invalid Review with wrong data types. Should return a 400 Bad Request Data Type', async () => {

    })
})

describe('Contact Us - Testing Suite', () => {
    test('Fetch All Contacts', async () => {

    });

    test('Create Contact With Valid Data. Should return a 201 Status Code', async () => {

    })

    test('Create Contact with Missing Data. Should return a 404 status code', async () => {

    });

    test('Delete all contacts. Should return a 204 status code', async () => {
        
    })
})

describe('Feedback - Testing Suite', () => {
    test('Fetch All Feedbacks. Should return a 200 Status Code', async () => {

    });

    test('Create Feedback. Should return a 201 Status Code', async () => {

    });

    
})