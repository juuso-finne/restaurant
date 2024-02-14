const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");
const {getExistingId, sendObjectToApi} = require("../../utilityFunctions/testUtilities");


describe("Menuitems DELETE", () => {

    const updateTestId = async () =>{
        const newId = await getExistingId();
        testParameters.endpoint = "/api/menuitems/" + newId;
        return newId;
    }

    const testUser = {
        name: "Test User",
        email: "test2@user.com",
        password: "testuser1234"
    };

    const testParameters = {
        method: "delete",
        endpoint: "/api/menuitems",
        token: "",
        testUser
    };

    let token = "";

    beforeAll(async () => {

        // Create a test user to the database
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUser);

        testParameters.token = response.body.token;
    });

    test("should delete the item from the database", async () => {
        const id = await updateTestId();
        // Delete
        const response = await sendObjectToApi(testParameters);

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Item ${id} deleted`);
    });

    test("should return an error if the item is not found", async () => {

        // Try to delete
        const response = await sendObjectToApi({...testParameters, endpoint: "/api/menuitems/nonExistingId"})

        // Check the response
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Unable to find item nonExistingId`);
    });

    test("should not delete the item if not logged in", async () => {
        await updateTestId();
        // Delete
        const response = await sendObjectToApi({...testParameters, token: ""});

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Authorization failed");
    });

    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end();
    });
});