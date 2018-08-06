const checkPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    return next();
  }
  return res.status(400).json({
    status: "fail",
    message: "Passwords do not match"
  });
};

export default checkPassword;
