const fs = require("fs");
const util = require("util");

const schema = require("./schema");

const PORTFOLIO_DATA_FILE_PATH = "./src/_data/portfolio.json";
const PORTFOLIO_ASSETS_DIR = "./src/assets/portfolio";

const readFile = util.promisify(fs.readFile);

function validateLocalImageExist() {
  return true;
}

async function validatePortfolioDataSchema(data) {
  try {
    await schema.validate(data);
  } catch (error) {
    const errorDump = JSON.stringify(error.errors, null, 2);
    throw new Error(errorDump);
  }
}

const isLocalImage = (imagePath) =>
  !new RegExp("^(http|https)://", "i").test(imagePath);

module.exports = async function validatePortfolioData() {
  const portfolioFileContent = await readFile(PORTFOLIO_DATA_FILE_PATH);
  const portfolioData = JSON.parse(portfolioFileContent);
  
  await validatePortfolioDataSchema(portfolioData);

  const localImages = portfolioData
    .map(({ imageUrls }) => Object.values(imageUrls))
    .filter(isLocalImage);

  await Promise.all(localImages.map(validateLocalImageExist));
};
