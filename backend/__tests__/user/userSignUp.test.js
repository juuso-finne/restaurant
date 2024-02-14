const {describe, expect, test, afterAll} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");
const jwt = require('jsonwebtoken');
const {
    checkEmptyProps,
    checkExtraProps,
    checkMissingProps,
    sendObjectToApi
 } = require("../../utilityFunctions/testUtilities");


describe("User signup", () => {

    const testUser = {
        name: "Test User",
        email: "test4@user.com",
        password: "testuser1234"
    }

    const testParameters = {
        method: "post",
        endpoint: "/api/users/signup",
        token: "",
        testObject: testUser
    };

    test("should create user account", async () =>{

        // Post new user data
        const response = await sendObjectToApi(testParameters);

        const {id, token, email} = response.body;

        // Check the response
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(id).toBeTruthy();
        expect(token).toBeTruthy();
        expect(email).toEqual(testUser.email);

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        expect(decodedToken.iat).toBeLessThan(Date.now() / 1000);
        expect(decodedToken.exp).toBeGreaterThan(Date.now() / 1000);
        expect(decodedToken.email).toEqual(testUser.email);
    });

    test("should not accept empty fields", async () =>{
        checkEmptyProps(testParameters);
    });

    test("should not accept missing fields", async () =>{
        checkMissingProps(testParameters);
    });

    test("should not allow extra properties", async () =>{
        checkExtraProps(testParameters);
    });


    test("should validate e-mail address", async () =>{

        const testUserClone = {...testUser, email:"testuser.com"};

        // Post new user data
        const response = await sendObjectToApi({...testParameters, testObject: testUserClone});

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`\"email\" must be a valid email`);
    });

    test("should not allow duplicate e-mails in db", async () =>{

        // Try to signup with existing e-mail
        const response = await sendObjectToApi(testParameters);

        // Check the response
        expect(response.status).toEqual(422);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("User already exists");
    });

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });
})