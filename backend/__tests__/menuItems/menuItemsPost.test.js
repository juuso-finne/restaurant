const { describe, expect, test, beforeAll } = require("@jest/globals");
const { checkEmptyProps, checkMissingProps } = require("../../utilityFunctions/testUtilities");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");

describe("Menuitems POST", () => {
    const testUser = {
        name: "Test User",
        email: "test0@user.com",
        password: "testuser1234"
    };


    const testObject = {
        name: "Mustamakkara",
        price: "7.50",
        description: "Mansesta nääs",
        image: "tapola.jpg"
    }

    let token = "";

    beforeAll(async () => {

        // Create a test user to the database
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUser);

        token = response.body.token;
    });

    test("should create a new item to the database", async () => {

        // Post the test object
        const postResponse = await request(app)
            .post("/api/menuitems")
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + token)
            .send(testObject);

        // Check the response
        expect(postResponse.status).toEqual(201);
        expect(postResponse.headers['content-type']).toMatch(/json/);
        expect(postResponse.body).toEqual(expect.objectContaining(testObject));

        // Check that the new object is on the menu
        const getResponse = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");
        expect(getResponse.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(testObject)
            ])
        );
    });

    test("should not accept empty properties", async () =>{
        checkEmptyProps(testObject, "/api/menuitems", "post", token);
    });

    test("should not accept missing properties", async () =>{
        checkMissingProps(testObject, "/api/menuitems", "post", token);
    });

    test("should not allow posting without logging in", async () =>{

        // Post the test object
        const response = await request(app)
        .post("/api/menuitems")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .send(testObject);

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Authorization failed`);

    });

    test("should not allow extra properties", async () =>{
        const testObjectClone = {...testObject, extraProperty: "Does not belong here"};

        // Try to post
        const response = await request(app)
        .post("/api/menuitems/")
        .set("Accept", "application/json")
        .set("Content", "application/json")
        .set("Authorization", "BEARER " + token)
        .send(testObjectClone);

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("\"extraProperty\" is not allowed");
    })

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });
});