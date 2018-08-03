const loginEmpty = (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(422).json({
      status: "fail",
      message: "Provide email and password."
    });
  }
  return next();
};

export default loginEmpty;
