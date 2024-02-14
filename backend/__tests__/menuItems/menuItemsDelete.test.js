const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");
const {getExistingId} = require("../../utilityFunctions/testUtilities");


describe("Menuitems DELETE", () => {

    const testUser = {
        name: "Test User",
        email: "test2@user.com",
        password: "testuser1234"
    };

    let token = "";

    beforeAll(async () => {

        // Create a test user to the database
        const response = await request(app)
        .post("/api/users/signup")
        .set("Accept", "application/json")
        .send(testUser);

        token = response.body.token;
    });

    test("should delete the item from the database", async () => {
        const testId = await getExistingId();
        // Delete
        const response = await request(app)
            .delete(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Authorization", "BEARER " + token)

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Item ${testId} deleted`);
    });

    test("should return an error if the item is not found", async () => {
        const testId = "NonExistentId";
        // Delete
        const response = await request(app)
            .delete(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Authorization", "BEARER " + token)

        // Check the response
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Unable to find item ${testId}`);
    });

    test("should not delete the item if not logged in", async () => {
        const testId = await getExistingId();
        // Delete
        const response = await request(app)
            .delete(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")

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