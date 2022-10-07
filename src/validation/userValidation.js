const yup = require("yup");

const user = yup.object({
  body: yup.object({
    username: yup.string().min(4).max(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});

module.exports = { user };
