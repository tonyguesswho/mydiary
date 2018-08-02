const entryField = (req, res, next) => {
  const { title, description } = req.body;

  if (!title.trim() || !description.trim()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: "All fields are required"
    });
  }
  return next();
};

export default entryField;
