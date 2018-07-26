import joi from 'joi';

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

export default validateEntry;
