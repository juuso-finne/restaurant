const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

//Helper function for getting an existing item ID
const getExistingId = async () =>{
    const items = await request(app)
        .get("/api/menuitems")
        .set("Accept", "application/json");
    return items.body[0].id;
}

describe("Menuitems PUT", () => {

    test("should update an item in the database", async () => {
        const testObject = {
            name: "Surströmming",
            price: "2.60",
            description: "You don't wanna know",
            image: "srst.jpg"
        }

        const testId = await getExistingId();
        // Edit the item
        const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .send(testObject);

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.updatedItem).toEqual(expect.objectContaining(testObject));
        expect(response.body.message).toMatch(`Item ${testId} updated`);
    });

    test("should not accept empty properties", async () =>{
        const testObject = {
            name: "Mustamakkara",
            price: "7.50",
            description: "Mansesta nääs",
            image: "tapola.jpg"
        }

        const testId = await getExistingId();

        // Check all properties
        const properties = ["name", "price", "description", "image"]

        for (const prop of properties){

            // Make a copy of the test object and set the tested property to empty
            const testObjectClone = {...testObject};
            testObjectClone[prop] = '';

            // Post the new test object
            const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
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
        const testObject = {
            name: "Mustamakkara",
            price: "7.50",
            description: "Mansesta nääs",
            image: "tapola.jpg"
        }

        const testId = await getExistingId();

        // Check all properties
        const properties = ["name", "price", "description", "image"]

        for (const prop of properties){

            // Make a copy of the test object and delete the tested property
            const testObjectClone = {...testObject};
            delete testObjectClone[prop];

            // Post the new test object
            const response = await request(app)
            .put(`/api/menuitems/${testId}`)
            .set("Accept", "application/json")
            .set("Content", "application/json")
            .send(testObjectClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is required`);
        }
    });
});

module.exports = getExistingId;