import joi from "joi";

function validateEntry(body) {
  const schema = {
    title: joi
      .string()
      .min(1)
      .required(),
    description: joi
      .string()
      .min(1)
      .required()
  };
  return joi.validate(body, schema);
}

function validateUser(body) {
  const schema = {
    email: joi
      .string()
      .email()
      .required(),
    username: joi
      .string()
      .alphanum()
      .min(3)
      .max(30),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  };
  return joi.validate(body, schema);
}

// export default validateEntry;

module.exports = {
  validateEntry,
  validateUser
};
