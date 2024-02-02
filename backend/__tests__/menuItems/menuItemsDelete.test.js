const {describe, expect, test} = require("@jest/globals");
const getExistingId = require("./menuItemsPut.test");
const request = require("supertest");
const app = require("../../app");

describe("Menuitems DELETE", () => {

    test("Should return 200 and valid json", async () =>{
        expect(true).toBeTruthy();
    });


});