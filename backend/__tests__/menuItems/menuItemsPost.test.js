const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

describe("Menuitems POST", () => {

    test("should create a new item to the database", async () => {
        const testObject = {
            name: "Mustamakkara",
            price: "7.50",
            description: "Mansesta nääs",
            image: "tapola.jpg"
        }

        // Post the test object
        const postResponse = await request(app)
            .post("/api/menuitems")
            .set("Accept", "application/json")
            .set("Content", "application/json")
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
        const testObject = {
            name: "Mustamakkara",
            price: "7.50",
            description: "Mansesta nääs",
            image: "tapola.jpg"
        }

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
            .send(testObjectClone);

            // Check the response
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.message).toMatch(`\"${prop}\" is required`);
        }
    });
});