import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'gragra');
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = {
  checkAuth
};
