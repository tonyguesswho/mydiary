// Email pattern gotten from from http://emailregex.com/

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    return next();
  }
  return res.status(400).json({
    status: "fail",
    message: "Invalid Email Address"
  });
};

export default checkEmail;
