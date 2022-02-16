/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved.
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright.
 */


const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server/server');

beforeAll(async() => { // Test DB connection before the tests
    const url = 'mongodb+srv://sabin2000:123mini123@cluster0.xcriw.mongodb.net/electricHouseholds?retryWrites=true&w=majority';
    return await mongoose.connect(url);
});


describe('Authentication Test Suite', () => {

    test("Register New Admin Account. Should respond with a 201 created", async () => {
       
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

    test('Admin Login - Invalid Password. Returns a 401 Unauthorized Code', async () => {
        const bodyData = [{emailAddress: "testadmin00@gmail.com", password: "afjdewjejf"}];

        for(const data of bodyData) {

            const response = await request(server).post('/api/v1/auth/login-admin').send(data);
            return expect(response.statusCode).toBe(401);

        }
    })
    
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
        const applianceBodyData = [{name: "Washing Machine", description: "A Washing Machine"}];

        for(const data of applianceBodyData) {
            const response = await request(server).post('/api/v1/appliances/create-appliance').send(data);

            return expect(response.statusCode).toBe(201);
        } 
    });

    test('Bots - Get All Bots. Returns with 200 OK Status Code', async () => {
        const response = await request(server).get('/api/v1/bot/get-bots').send();

        return expect(response.statusCode).toBe(200);
    });

    test('Bots - Delete All Bot Data. Returns with a 204 No Content Status Code', async () => {
        const noContentData = [{}];

        for(const data of noContentData) {
            const response = await request(server).delete('/api/v1/bot/delete-bots').send(data);

            return expect(response.statusCode).toBe(204);
        }
    });

    test('Admin - Delete All Electrical Appliances. Should Return with 204 No Content Code', async () => {
        const noElectricalAppliances = [{}];

        for(const data of noElectricalAppliances) {
            const response = await request(server).delete('/api/v1/appliances/delete-appliances').send(data);

            return expect(response.statusCode).toBe(204);
        }
    });

    test('Timeslots - Fetch All Timeslots. Should Return with a 200 OK Status Code', async () => {
        const response = await request(server).get('/api/v1/timeslots/fetch-timeslots', async () => {
            return expect(response.statusCode).toBe(200);
        })
    });

    test('Bids - Get All Bid Data. Returns a 200 OK Status Code', async () => {
        const response = await request(server).get('/api/v1/bids/fetch-bids', async () => {
            return expect(response.statusCode).toBe(200);
        })
    });

    test('List virtual credits. Should return with a 200 OK Status Code', async () => {
        const response = await request(server).get('/api/v1/credits/get-credits', async () => {
            return expect(response.statusCode).toBe(200);
        })
    });


    test('Comments - Get All Comment Data. Returns a 200 OK status Code', async () => {
        const response = await request(server).get('/api/v1/comments/fetch-comments', async () => {
            return expect(response.statusCode).toBe(200);
        })
    });

    test('Create Virtual Credits - Should return with a 201 status code.', async () => {
       const bodyData = [{virtualCredits: "1000"}];

       for(const body of bodyData) {
           const response = await request(server).post('/api/v1/credits/create-credits').send(body);

           return expect(response.statusCode).toBe(201);
       }
    } )

})