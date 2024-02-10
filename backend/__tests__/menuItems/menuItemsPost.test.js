const {describe, expect, test, beforeAll} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");

describe("Menuitems POST", () => {
    const loggedInUser = {
        name: "",
        email: "",
        token: ""
    }

    const testObject = {
        name: "Mustamakkara",
        price: "7.50",
        description: "Mansesta nääs",
        image: "tapola.jpg"
    }

       beforeAll(async () =>{

        const data = {
            email: process.env.DB_TEST_USERNAME,
            password: process.env.DB_TEST_PASSWORD
        };

        const response = await request(app)
            .post("/api/users/login")
            .set("Accept", "application/json")
            .send(data);

        loggedInUser.name = response.body.name;
        loggedInUser.email = response.body.email;
        loggedInUser.token = response.body.token;
    });


    test("should create a new item to the database", async () => {

        // Post the test object
        const postResponse = await request(app)
            .post("/api/menuitems")
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + loggedInUser.token)
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

        // Check all properties
        const properties = ["name", "price", "description", "image"]


        for (const prop of properties){

            // Make a copy of the test object and set the tested property to empty
            const testObjectClone = {...testObject};
            testObjectClone[prop] = '';

            // Post the new test object
            const response = await request(app)
            .post("/api/menuitems")
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + loggedInUser.token)
            .send(testObjectClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect([
                `\"${prop}\" is not allowed to be empty`,
                `\"${prop}\" must be a number`
            ]).toContain(response.body.message);
        }
    });

    test("should not accept missing properties", async () =>{

        // Check all properties
        const properties = ["name", "price", "description", "image"]

        for (const prop of properties){

            // Make a copy of the test object and delete the tested property
            const testObjectClone = {...testObject};
            delete testObjectClone[prop];

            // Post the new test object
            const response = await request(app)
            .post("/api/menuitems")
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + loggedInUser.token)
            .send(testObjectClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is required`);
        }
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
        .set("Authorization", "BEARER " + loggedInUser.token)
        .send(testObjectClone);

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("\"extraProperty\" is not allowed");
    })

    afterAll(async () => {
        await pool.end(); // Close the connection pool
    });
});