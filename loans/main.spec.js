// Libraries
const chai = require("chai");
// Function to test
const getLiquidatableLoans = require("./main");

const expect = chai.expect;

describe("getLiquidatableLoans", () => {
	describe("when given the current date", () => {
		it("returns an array with 1, 2 and 3", async () => {
			const dateToTest = new Date();
			
			const result = getLiquidatableLoans(dateToTest);

			expect(result).to.eql([1, 2, 3]);
		});
	});
});