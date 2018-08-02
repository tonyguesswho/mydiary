import { db } from "../models/connect";

const checkForUser = (req, res, next) => {
  db.one("SELECT email FROM users WHERE email = $1", req.body.email)
    .then(() =>
      res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "User already exist"
      })
    )
    .catch(() => next());
};

export default checkForUser;
