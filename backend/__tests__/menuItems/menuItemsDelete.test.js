const {describe, expect, test} = require("@jest/globals");
const getExistingId = require("./menuItemsPut.test");
const request = require("supertest");
const app = require("../../app");

describe("Menuitems DELETE", () => {

    test("should delete the item from the database", async () => {
        const testId = await getExistingId();
        // Delete
        const response = await request(app)
            .delete(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")

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

        // Check the response
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`Unable to find item ${testId}`);
    });
});