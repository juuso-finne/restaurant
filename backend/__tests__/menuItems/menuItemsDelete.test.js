const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");


//Helper function for getting an existing item ID
const getExistingId = async () =>{
    const items = await request(app)
        .get("/api/menuitems")
        .set("Accept", "application/json");
    return items.body[0].id;
}

describe("Menuitems DELETE", () => {

    const loggedInUser = {
        name: "",
        email: "",
        token: ""
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

/*     beforeAll(async () =>{

        const data = {
            name: "Admin Adminsson",
            email: "admin3@abc.com",
            password: "adminadminsson"
        };

        await pool.query("DELETE FROM `users` WHERE `email` = ?", data.email);

        const response = await request(app)
            .post("/api/users/signup")
            .set("Accept", "application/json")
            .send(data);

        loggedInUser.name = response.body.name;
        loggedInUser.email = response.body.email;
        loggedInUser.token = response.body.token;
    }); */


    test("should delete the item from the database", async () => {
        const testId = await getExistingId();
        // Delete
        const response = await request(app)
            .delete(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Authorization", "BEARER " + loggedInUser.token)

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
            .set("Authorization", "BEARER " + loggedInUser.token)

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
        await pool.end();
    });
});