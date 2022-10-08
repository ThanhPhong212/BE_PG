const yup = require("yup");

const product = yup.object({
  body: yup.object({
    name: yup.string().min(2).max(25).required(),
    description: yup.string(),
    price: yup.number().min(1000).required(),
    amount: yup.number().min(1).required(),
    categoryID: yup.string().required(),
  }),
});

module.exports = { product };
