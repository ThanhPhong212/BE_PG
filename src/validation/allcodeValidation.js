const yup = require("yup");

const allcode = yup.object({
  body: yup.object({
    type: yup.string().min(3).required(),
    key: yup.string().min(2).required(),
    value: yup.string().min(3).required(),
  }),
});

module.exports = { allcode };
