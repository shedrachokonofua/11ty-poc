const { array, object, string } = require("yup");

const portfolioItemSchema = object({
  name: string().required(),
  tags: array(string()).required(),
  imageUrls: object({
    coverImage: string().required(),
    secondaryImage: string().required(),
  }).required(),
});

module.exports = array(portfolioItemSchema).required();
