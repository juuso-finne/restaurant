const {describe, expect, test, beforeAll} = require("@jest/globals");
const { checkEmptyProps, checkMissingProps } = require("../../utilityFunctions/testUtilities");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");
const jwt = require('jsonwebtoken');

describe("User login", () => {
    const testUser = {
        name: "Test User",
        email: "test3@user.com",
        password: "testuser1234"
    };

    const {name, ...credentials} = testUser;

    beforeAll(async () => {

        // Create a test user to the database
        await request(app)
            .post("/api/users/signup")
            .set("Accept", "application/json")
            .send(testUser);
    });

    test("should log the user in, given the correct email and password", async () =>{

        // Log in the test user
        const response = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(credentials);

        // Check the response
        const {id, email, token} = response.body

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(id).toBeTruthy();
        expect(token).toBeTruthy();
        expect(email).toEqual(credentials.email);

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        expect(decodedToken.email).toEqual(testUser.email);
        expect(decodedToken.id).toEqual(id);
        expect(decodedToken.iat).toBeLessThan(Date.now() / 1000);
        expect(decodedToken.exp).toBeGreaterThan(Date.now() / 1000);
    });

    test("should not allow the user in with the wrong password", async () =>{
        const falseCredentials = {...credentials, password: "wrongPassword"};

        // Attempt login
        const response = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(falseCredentials);

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Could not identify credentials");
    });

    test("should not allow non-existetnt users in", async () =>{
        const falseCredentials = {...credentials, email: "wrong@email.com"};

        // Attempt login
        const response = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(falseCredentials);

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Could not identify credentials");
    });

    test("should not accept empty properties", async () =>{
        checkEmptyProps(credentials, "/api/users/login", "post");
    });

    test("should not accept missing properties", async () =>{
        checkMissingProps(credentials, "/api/users/login", "post");
    });

    test("should not allow extra properties", async () =>{
        const falseCredentials = {
            email: "john.wayne@hollywood.com",
            password: "john123",
            extraProperty: "hello"
        }

        // Attempt login
        const response = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(falseCredentials);

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("\"extraProperty\" is not allowed");
    });

    afterAll(async () => {
        // Remove test user from db and close all connections
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });

})