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

describe("Menuitems PUT", () => {

    const testUser = {
        name: "Test User",
        email: "test1@user.com",
        password: "testuser1234"
    };

    const testObject = {
        name: "Surströmming",
        price: "2.60",
        description: "You don't wanna know",
        image: "srst.jpg"
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

    test("should update an item in the database", async () => {


        const testId = await getExistingId();
        // Try to update
        const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + token)
            .send(testObject);

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.updatedItem).toEqual(expect.objectContaining(testObject));
        expect(response.body.message).toMatch(`Item ${testId} updated`);
    });

    test("should not accept empty properties", async () =>{
        const testId = await getExistingId();

        // Check all properties
        const properties = ["name", "price", "description", "image"]

        for (const prop of properties){

            // Make a copy of the test object and set the tested property to empty
            const testObjectClone = {...testObject};
            testObjectClone[prop] = '';

            // Try to update
            const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + token)
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

        const testId = await getExistingId();

        // Check all properties
        const properties = ["name", "price", "description", "image"]

        for (const prop of properties){

            // Make a copy of the test object and delete the tested property
            const testObjectClone = {...testObject};
            delete testObjectClone[prop];

            // Try to update
            const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + token)
            .send(testObjectClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is required`);
        }
    });

    test("returns an error if the item is not found", async() =>{

        // Try to update
        const response = await request(app)
            .put(`/api/menuitems/nonExistingId`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .set("Authorization", "BEARER " + token)
            .send(testObject);

        // Check the response
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Item nonExistingId not found");
    });

    test("should not update if not logged in", async () => {
        const testObject = {
            name: "Surströmming",
            price: "2.60",
            description: "You don't wanna know",
            image: "srst.jpg"
        }

        const testId = await getExistingId();
        // Try to update
        const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .send(testObject);

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Authorization failed");
    });

    test("should not allow extra properties", async () =>{
        const testObjectClone = {...testObject, extraProperty: "Does not belong here"};

        const testId = await getExistingId();
        // Try to update
        const response = await request(app)
        .put(`/api/menuitems/${testId}`)
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