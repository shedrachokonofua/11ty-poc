const validatePortfolioData = require("./validate-portfolio-data");

function onSuccess() {
  console.log("Portfolio data valid.");
  process.exit(0); // 'Success' code.
}

function onError(error) {
  console.log("Failed to validate portfolio data.");
  console.log(error.message);
  process.exit(1); // 'Failure' code.
}

validatePortfolioData().then(onSuccess).catch(onError);
