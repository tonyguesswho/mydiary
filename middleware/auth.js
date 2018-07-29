import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
   

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next(req.userData);
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = {
  checkAuth
};
