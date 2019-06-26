/**
 *
 *  Assumptions for time constrains
 *
 * if (principalTokenId: null) = USDC = DAI all equal to $1
 *
 *  Token was not needed for calculation since they were both equal
 *
 *  Took the Minimum price for the day if collateral was less then it was added to output Array.
 *
 *  Todo: Refactor
 *  for loops into Array built in methods
 *
 *
 */

const loans = require('../loans.json'); //?
const etherPrice = require('../eth-price.json');
const tokens = require('../tokens.json');

const MS_PER_DAY = 1000 * 60 * 60 * 24; // 86400000

// Given a date, returns which loans were liquidatable.

async function getLiquidatableLoans(givenDate) {
  const etherMinPriceForGivenDate = await getMinEtherPricesForGivenDate(
    givenDate,
    etherPrice
  );

  const loansIDToLiquidate = await getLoansToLiquidateForDay(
    givenDate,
    loans,
    etherMinPriceForGivenDate
  );

  return [...loansIDToLiquidate];
}

function getMinEtherPricesForGivenDate(givenDate, etherData) {
  const etherPricesForDate = [];
  const dateToFilter = givenDate.getDate();

  for (let i = 0; i < etherData.length; i++) {
    let ether = etherData[i];

    let dateOfEther = new Date(ether.date).getDate();
    if (dateToFilter === dateOfEther) {
      etherPricesForDate.push(ether.value);
    }
  }
  return Math.min(...etherPricesForDate);
}

function getLoansToLiquidateForDay(date, loans, minEtherPrice) {
  const loansID = [];

  for (let j = 0; j < loans.length; j++) {
    let loan = loans[j];

    let collateral = loan.collateralAmount * minEtherPrice;

    let principalAmount = loan.principalAmount;

    if (isLoanPastDue(date, loan)) {
      loansID.push(loan.id);
    } else if (collateral === 0) {
      loansID.push(loan.id);
    } else {
      if (collateral < principalAmount) {
        loansID.push(loan.id);
      }
    }
  }
  return loansID;
}

function isLoanPastDue(dateToTest, loan) {
  const dateToTestInMS = dateToTest.getTime();

  const loanIssueDate = parseInt(loan.filledAt);
  const daysToExpire = loan.durationInDays;
  const durationOfLoanInMS = MS_PER_DAY * daysToExpire;

  const loanExpire = loanIssueDate + durationOfLoanInMS;

  if (dateToTestInMS > loanExpire) {
    return true;
  }
  return false;
}

module.exports = {
  getLiquidatableLoans,
  getMinEtherPricesForGivenDate,
  getLoansToLiquidateForDay,
  isLoanPastDue,
  MS_PER_DAY
};
