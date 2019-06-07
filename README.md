# Liquidate the Loans!

## A Take-Home Exercise for Dharma Engineering

Dharma is a place where people lend and borrow cryptocurrency. That means, people can borrow one cryptocurrency (for example, DAI stablecoin, or ETH), while putting up another currency as collateral.

In Dharma, all loans are overcollateralized, which means that the value of the collateral in USD is greater than the value of the principal in USD when the loan is filled.

However, we know that cryptocurrency prices can be volatile -- with prices dropping multiple percentages in a day!

That means that the value of collateral for a given loan can sometimes drop to lower than the value of the principal. In this case we want to perform something called a "liquidation", where the collateral is sold off to cover this difference.

Each loan also has a duration (e.g. 90 days), and are past due (and hence liquidatable) if they have been outstanding for longer than that duration.

There are three files in this repo:

eth-price.json
- This file has all of the ETH price changes for just over one day

loans.json
- This file has an array of loans, including the principal amount, collateral amount, principal token ID, and collateral token ID

tokens.json
- This file associates tokens with token IDs.

### Requirements

Write a function, preferrably in JavaScript if you can (but something like Python, Ruby, Java, etc. if you can't), that can take in a date, and return the IDs of loans were liquidatable at that date.

Note: Assume that DAI and USDC are both worth $1.

For example:

```
const exampleDate = new Date(1558650159442);
// => Thu May 23 2019 15:22:39 GMT-0700 (Pacific Daylight Time);

getLiquidatableLoans(exampleDate);
=> [18, 22, 23, 24]
```

This will require reading in each of the three files, and finding which loans have a collateral amount that is worth less than the principal amount.

Please try and include some tests. An example repo is included.

