const yup = require("yup");

const userRegister = yup.object({
  body: yup.object({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});

const createUser = yup.object({
  body: yup.object({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    role: yup.string().required(),
  }),
});

const userLogin = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});

module.exports = { userRegister, userLogin, createUser };
