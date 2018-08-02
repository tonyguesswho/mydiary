const checkPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    return next();
  }
  return res.status(400).json({
    statusCode: 400,
    status: "error",
    message: "Password do not match"
  });
};

export default checkPassword;
