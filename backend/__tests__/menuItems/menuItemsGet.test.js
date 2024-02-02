const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

describe("Menuitems GET", () => {

    test("Should return 200 and valid json", async () =>{
        const response = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });


});