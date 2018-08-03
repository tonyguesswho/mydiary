const undefinedSignup = (req, res, next) => {
  const { email, username, password } = req.body;

  if (email === undefined || username === undefined || password === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required"
    });
  }
  return next();
};

export default undefinedSignup;
