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
            .send(testUser);

        const {id, token, email} = response.body;

        // Check the response
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(id).toBeTruthy();
        expect(token).toBeTruthy();
        expect(email).toEqual(testUser.email);
    });

    test("Empty fields should not be accepted", async () =>{
        const properties = ["name", "email", "password"]
        for (const prop of properties){
            const testUserClone = {...testUser};
            testUserClone[prop] = "";

            // Post new user data
            const response = await request(app)
            .post("/api/users/signup")
            .set("Accept", "application/json")
            .send(testUserClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is not allowed to be empty`);
        }
    })

    test("Missing fields should not be accepted", async () =>{
        const properties = ["name", "email", "password"]
        for (const prop of properties){
            const testUserClone = {...testUser};
            delete testUserClone[prop];

            // Post new user data
            const response = await request(app)
            .post("/api/users/signup")
            .set("Accept", "application/json")
            .send(testUserClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is required`);
        }
    })

    test("E-mail address should be validated", async () =>{

        const testUserClone = {...testUser, email:"testuser.com"};

        // Post new user data
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUserClone);

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`\"email\" must be a valid email`);
    })

    test("Duplicate e-mails should not be allowed", async () =>{

        // Post new user data
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUser);

        // Check the response
        expect(response.status).toEqual(422);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("User already exists");
    })

    test("Extra properties should not be allowed", async () =>{
        const testUserClone = {...testUser, extraProperty:"testuser.com"};

        // Post new user data
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUserClone);

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("\"extraProperty\" is not allowed");
    })

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    })
})