const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./generate-id');

const expect = testHelpers.expect;

describe("lib/entity/generate-id", () => {
    it("should expose a function with 1 param", () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it("should throw when no params", () => {
        expect(() => moduleToTest()).to.throw();
    });
});
