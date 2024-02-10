const {describe, expect, test, afterAll} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");


describe("User signup", () => {

    const testUser = {
        name: "Test User",
        email: "test@user.com",
        password: "testuser1234"
    }

    test("User account should be created", async () =>{

        // Post new user data
        const response = await request(app)
            .post("/api/users/signup")
            .set("Accept", "application/json")
            .send(testUser)

        const {id, token, email, name} = response.body;

        // Check the response
        expect(response.headers['content-type']).toMatch(/json/);
        expect(id).toBeTruthy();
        expect(token).toBeTruthy();
        expect(email).toEqual(testUser.email);
    });

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
    })
})