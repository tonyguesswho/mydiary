const undefinedLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required"
    });
  }
  return next();
};

export default undefinedLogin;
