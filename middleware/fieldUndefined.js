const fieldUndefined = (req, res, next) => {
  const { title, description } = req.body;

  if (title === undefined || description === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required"
    });
  }
  return next();
};

export default fieldUndefined;
