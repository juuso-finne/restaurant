const {expect} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

// // Function for checking the handling of empty properties in request objects
const checkEmptyProps = async (testParameters) => {

    const {testObject} = {...testParameters}

    for (const prop of Object.keys(testObject)){

        // Make a copy of the test object and set the property to empty
        const testObjectClone = {...testObject};
        testObjectClone[prop] = '';

        const response = await sendObjectToApi({...testParameters, testObject: testObjectClone});

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect([
            `\"${prop}\" is not allowed to be empty`,
            `\"${prop}\" must be a number`
        ]).toContain(response.body.message);
    }
}

// Function for checking the handling of unwanted properties in request objects
const checkExtraProps = async (testParameters) =>{

    // Add an unexpected property to the test object
    const {testObject} = {...testParameters}
    const testObjectClone = {...testObject, extraProperty: "Does not belong here"};

    const response = await sendObjectToApi({...testParameters, testObject: testObjectClone});

    // Check the response
    expect(response.status).toEqual(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.message).toMatch("\"extraProperty\" is not allowed");
}

// Function for checking the handling of missing properties in request objects
const checkMissingProps = async (testParameters) =>{

    const {testObject} = {...testParameters}

    for (const prop of Object.keys(testObject)){

        // Make a copy of the test object with a missing property
        const testObjectClone = {...testObject};
        delete testObjectClone[prop];

        const response = await sendObjectToApi({...testParameters, testObject: testObjectClone});

        // Check the response
        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch(`\"${prop}\" is required`);
    }
}

// Function for getting an existing item ID from database
const getExistingId = async () =>{

    const items = await request(app)
        .get("/api/menuitems")
        .set("Accept", "application/json");
    return items.body[0].id;
}

// Function to send an API request with json object payload
const sendObjectToApi = (testParameters) => {

    const {testObject, endpoint, method, token} = testParameters;

    return request(app)
    [method.toLowerCase()](endpoint)
    .set("Accept", "application/json")
    .set("Content", "application/json")
    .set("Authorization", "BEARER " + token)
    .send(testObject);
}


module.exports = {
    checkEmptyProps,
    checkExtraProps,
    checkMissingProps,
    getExistingId,
    sendObjectToApi
}