// Libraries
const chai = require('chai');
// Function to test
const {
  getLiquidatableLoans,
  getMinEtherPricesForGivenDate,
  getLoansToLiquidateForDay,
  isLoanPastDue,
  MS_PER_DAY
} = require('./main');

const loansTest = require('./loans-test.json');
const etherTestPrice = require('./eth-test-price');

const expect = chai.expect;
const dateToTest = new Date(1558650159442);

describe('getMinEtherPricesForGivenDate', () => {
  describe('when given the current date', () => {
    it('returns the minimum price for the day ', async () => {
      const minPrice = getMinEtherPricesForGivenDate(
        dateToTest,
        etherTestPrice
      );

      expect(minPrice).to.eql(244.9773);
    });
  });
});

describe('getLoansToLiquidateForDay', () => {
  describe('when given the current date', () => {
    it('returns an array with IDs', async () => {
      const minPrice = 244.9773;

      const result = getLoansToLiquidateForDay(dateToTest, loansTest, minPrice);

      expect(result).to.eql([6368, 6367, 5877]);
    });
  });
});

const testLoan = {
  id: 6370,
  principalAmount: 0.1388,
  collateralAmount: 0.001,
  principalTokenId: 4,
  collateralTokenId: 1,
  filledAt: '1558650159442',
  durationInDays: 90
};

describe('isLoanPastDue', () => {
  describe('when given the current date', () => {
    it('returns false if loan is not expired ', async () => {
      const result = isLoanPastDue(dateToTest, testLoan);

      expect(result).to.eql(false);
    });
  });

  describe('when given a future date', () => {
    it('returns true if past due ', async () => {
      const dateToTestPlus91Days = dateToTest.getTime() + MS_PER_DAY * 91;
      const futureDay = new Date(dateToTestPlus91Days);

      const result = isLoanPastDue(futureDay, testLoan);

      expect(result).to.eql(true);
    });
  });
});

describe('getLiquidatableLoans', () => {
  describe('when given the current date', () => {
    it('returns an array with loan IDs to liquidate', async () => {
      const result = getLiquidatableLoans(
        dateToTest,
        loansTest,
        etherTestPrice
      );

      const resultAwait = await result;

      expect(resultAwait).to.eql([
        6368,
        6362,
        6183,
        6179,
        6121,
        6120,
        6114,
        5879
      ]);
    });
  });
});
