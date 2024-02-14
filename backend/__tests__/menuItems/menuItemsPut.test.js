const {describe, expect, test} = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");
const {
    checkEmptyProps,
    checkExtraProps,
    checkMissingProps,
    getExistingId,
    sendObjectToApi
 } = require("../../utilityFunctions/testUtilities");



describe("Menuitems PUT", () => {

    const updateTestId = async () =>{
        const newId = await getExistingId();
        testParameters.endpoint = "/api/menuitems/" + newId;
        return newId;
    }

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

    const testParameters = {
        method: "put",
        endpoint: "/api/menuitems/",
        token: "",
        testObject
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

    test("should update an item in the database", async () => {

        const id = await updateTestId();

        // Try to update
        const response = await sendObjectToApi(testParameters);

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.updatedItem).toEqual(expect.objectContaining(testObject));
        expect(response.body.message).toMatch(`Item ${id} updated`);
    });

    test("should not accept empty properties", async () =>{

        await updateTestId();
        checkEmptyProps(testParameters);
    });

    test("should not accept missing properties", async () =>{

        await updateTestId();
        checkMissingProps(testParameters);
    });

    test("should not allow extra properties", async () =>{

        await updateTestId();
        checkExtraProps(testParameters);
    })

    test("returns an error if the item is not found", async() =>{

        // Try to update
        const response = await sendObjectToApi({...testParameters, endpoint: "/api/menuitems/nonExistingId"})

        // Check the response
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Item nonExistingId not found");
    });

    test("should not update if not logged in", async () => {

        await updateTestId();
        // Try to update
        const response = await sendObjectToApi({...testParameters, token:""});

        // Check the response
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch("Authorization failed");
    });


    afterAll(async () => {
        await pool.query('DELETE FROM `users` WHERE `email` = ?', testUser.email);
        await pool.end(); // Close the connection pool
    });
});