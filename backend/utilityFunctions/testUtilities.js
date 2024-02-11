const {expect} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

const checkEmptyProps = async (testObject, endpoint, method, token = "") => {

        const properties = Object.keys(testObject);

        for (const prop of properties){

            // Make a copy of the test object and set the tested property to empty
            const testObjectClone = {...testObject};
            testObjectClone[prop] = '';

            // Post the new test object
            const response = await request(app)
            [method.toLowerCase()](endpoint)
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
}

const checkMissingProps = async (testObject, endpoint, method, token = "") =>{

            const properties = Object.keys(testObject);

            for (const prop of properties){

try {
                    // Make a copy of the test object and delete the tested property
                    const testObjectClone = {...testObject};
                    delete testObjectClone[prop];

                    // Post the new test object
                    const response = await request(app)
                    [method.toLowerCase()](endpoint)
                    .set("Accept", "application/json")
                    .set("Content", "application/json")
                    .set("Authorization", "BEARER " + token)
                    .send(testObjectClone);

                    // Check the response
                    expect(response.status).toEqual(400);
                    expect(response.headers['content-type']).toMatch(/json/);
                    expect(response.body.message).toMatch(`\"${prop}\" is required`);
} catch (error) {
    console.log(error);
}
            }
}

module.exports = {
    checkEmptyProps,
    checkMissingProps
}