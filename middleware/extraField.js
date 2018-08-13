const loginFields = (req, res, next) => {
  const fieldLength = Object.keys(req.body).length;
  if (fieldLength === 2) {
    return next();
  }
  return res.status(400).json({
    status: "fail",
    message: "Extra field(s) not required"
  });
};

const signupFields = (req, res, next) => {
  const fieldLength = Object.keys(req.body).length;
  if (fieldLength === 4) {
    return next();
  }
  return res.status(400).json({
    status: "fail",
    message: "Extra field(s) not required"
  });
};

const entryFields = (req, res, next) => {
  const fieldLength = Object.keys(req.body).length;
  if (fieldLength === 2) {
    return next();
  }
  return res.status(400).json({
    status: "fail",
    message: "Extra field(s) not required"
  });
};

module.exports = {
  loginFields,
  signupFields,
  entryFields
};
