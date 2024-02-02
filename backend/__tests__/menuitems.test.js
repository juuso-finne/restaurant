const {describe, expect, test} = require('@jest/globals');
const request = require("supertest");
const app = require("../app");

// Describe the test suite
describe("menuitems endpoint", () => {

    // Test to perform
/*     test('GET Should return 200 and valid json', async () =>{
        const response = await request(app)
            .get("/api/menuitems")
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: "d1",
                name: "Mac & Cheese",
                price: "8.99",
                description: "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
                image: "images/mac-and-cheese.jpg"
            })
        );
    }); */
});