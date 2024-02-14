const { describe, expect, test, beforeAll } = require("@jest/globals");
const {
    checkEmptyProps,
    checkExtraProps,
    checkMissingProps,
    sendObjectToApi
 } = require("../../utilityFunctions/testUtilities");


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

    const testParameters = {
        method: "post",
        endpoint: "/api/menuitems",
        token: "",
        testObject
    };

    beforeAll(async () => {

        // Create a test user to the database
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUser);

        testParameters.token = response.body.token;
    });

    test("should create a new item to the database", async () => {

        // send a POST request
        const response = await sendObjectToApi(testParameters);

        // Check the response
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.objectContaining(testParameters.testObject));

        // Check that the new object is on the menu
        const getResponse = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");
        expect(getResponse.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(testParameters.testObject)
            ])
        );
    });

    test("should not accept empty properties", async () =>{
        checkEmptyProps(testParameters);
    });

    test("should not accept missing properties", async () =>{
        checkMissingProps(testParameters);
    });

    test("should not allow extra properties", async () =>{
        checkExtraProps(testParameters);
    })

    test("should not allow posting without logging in", async () =>{

        // Send POST request with missing token
        const response = await sendObjectToApi({...testParameters, token: ""})

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Authorization failed`);

    });

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });
});