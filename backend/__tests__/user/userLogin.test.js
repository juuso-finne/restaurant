const {describe, expect, test, beforeAll} = require("@jest/globals");
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

        const response = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(credentials);

        const {id, email, token} = response.body

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(id).toBeTruthy();
        expect(token).toBeTruthy();
        expect(email).toEqual(credentials.email);
    });

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });

})