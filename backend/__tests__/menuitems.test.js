const {describe, expect, test} = require('@jest/globals');
const request = require("supertest");
const app = require("../app");

// Describe the test suite
describe("Menuitems endpoints", () => {

    // Test to perform
    test('GET Should return 200 and valid json', async () =>{
        const response = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST should create a new item to the database', async () => {
        const testObject = {
            name: "Mustamakkara",
            price: "7.50",
            description: "Mansesta",
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

   /*  test('GET Should return 200 and valid json', async () =>{
        const testObject = {
            name: "Mustamakkara",
            price: "7.00",
            description: "Mansesta",
            image: "tapola.jpg"
        }

        const response = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");
            console.log(response.body[response.body.length - 1]);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(testObject)
                ])
            );
    }); */
});