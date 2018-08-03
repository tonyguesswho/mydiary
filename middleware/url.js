const checkUrl = (req, res, next) => {
  const url = parseInt(req.params.id, 10);
  if (isNaN(url)) {
    return res.status(400).send({
      status: "fail",
      message: "Invalid Url"
    });
  }
  return next();
};

export default checkUrl;
