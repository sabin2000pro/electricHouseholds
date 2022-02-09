const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server/server');

beforeAll(async() => { // Test DB connection before the tests
    const url = 'mongodb+srv://sabin2000:123mini123@cluster0.xcriw.mongodb.net/electricHouseholds?retryWrites=true&w=majority';
    return await mongoose.connect(url);
});


describe('Authentication Test Suite', () => {

    test("Register New Admin Account. Should respond with a 201 created", async () => {
        const adminBodyData = [{username: "testadmin00", emailAddress: "testadmin00@gmail.com", password: "test123", confirmPassword: "test123"}]

        for(const bodyData of adminBodyData) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(bodyData);

            return expect(response.statusCode).toBe(201);
        }
    });

    test("Admin Login. Should Respond with 200 OK Code", async () => {
        const adminLoginData = [{emailAddress: "testadmin00@gmail.com", password: "test123"}]

        for(const loginData of adminLoginData) {
            const response = await request(server).post('/api/v1/auth/login-admin').send(loginData);

            return expect(response.statusCode).toBe(200);
        }
    });

    test("Admin Forgot Password. Should Respond with a 200 OK Status Code", async () => {
         const forgotBodyData = [{emailAddress: "testadmin00@gmail.com"}];

         for(const bodyData of forgotBodyData) {
             const response = await request(server).post('/api/v1/auth/forgot-password').send(bodyData);

             return expect(response.statusCode).toBe(200);
         }
    })

   
    // Test Case 2 - Admin Register Invalid Data
    test('Register Admin with Invalid Data. Should respond with 400 Bad Request', async () => {
        const invalidBodyData = [{username: "0", emailAddress: "admin2", password: '123'}];

        for(const bodyData of invalidBodyData) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(bodyData);
            return expect(response.statusCode).toBe(400);
        }
    });

    test('Admin Register. Missing @ symbol. Should respond with a 500 Server Error', async () => {
        const invalidBodyData = [{emailAddress: "adminhotmail.com", username: "admin", password: "testadmin1230", confirmPassword: "testAdmin1230"}];

        for(const bodyData of invalidBodyData) {
            const response = await request(server).post('/api/v1/auth/register-admin').send(bodyData);

            return expect(response.statusCode).toBe(500);
        }
    });

    test('Submit Timeslot Preference Test. Should Respond with a 201 Status Code.', async () => {
        const bodyData = [{username: "sabin2000", appliance: "Washing Machine", firstPreference: "00:00-10:00", secondPreference: "14:00-15:00", thirdPreference: "20:00-21:00"}];

        for(const data of bodyData) {
            const response = await request(server).post('/api/v1/preferences/create-preference').send(data);
            return expect(response.statusCode).toBe(201);
        }
    })

    test('Admin Login - Invalid Password. Returns a 401 Unauthorized Code', async () => {
        const bodyData = [{emailAddress: "testadmin00@gmail.com", password: "afjdewjejf"}];

        for(const data of bodyData) {

            const response = await request(server).post('/api/v1/auth/login-admin').send(data);
            return expect(response.statusCode).toBe(401);

        }
    })

    test('User - Submit Feedback Data. Returns 201 Created Code. ', async () => {
        const feedbackData = [{feedbackUsername: "sabin2009", feedbackEmailAddress: "sabin200@gmail.com", feedbackFeeling: "Happy", "feedbackDescription": "Amazing algorithm! I relly enjoyed playing against the bot"}]

        for(const bodyData of feedbackData) {
            const response = await request(server).post('/api/v1/feedback/create-feedback').send(bodyData);

            return expect(response.statusCode).toBe(201);
        }
    });

    test('Delete All Feedbacks. Returns a 204 Status Code no Content', async () => {
        const noContentData = [{}];

        for(const data of noContentData) {
            const response = await request(server).delete('/api/v1/feedback/delete-feedbacks').send(data);
            return expect(response.statusCode).toBe(204);
        }
    });

    test('Admin - Get All Appliances. Returns a 200 OK Status Code', async () => {
        const response = await request(server).get('/api/v1/preferences/fetch-preferences').send();
        return expect(response.statusCode).toBe(200);
    })

    test('Admin - Create Electrical Appliance. Returns a 201 Created Status Code', async () => {
        const applianceBodyData = [{}]
    });

    test('Bots - Get All Bots. Returns with 200 OK Status Code', async () => {

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

})})