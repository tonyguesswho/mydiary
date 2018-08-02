const isFieldEmpty = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username.trim() || !email.trim() || !password.trim()) {
    return res.status(400).send({
      statusCode: 400,
      status: "error",
      message: "Invalid field input"
    });
  }
  return next();
};

export default isFieldEmpty;
