const loginEmpty = (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Provide email and password."
    });
  }
  return next();
};

export default loginEmpty;
