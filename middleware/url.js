const checkUrl = (req, res, next) => {
  const url = parseInt(req.params.id, 10);
  if (
    Number(req.params.id) !== parseInt(req.params.id, 10) ||
    Math.sign(url) === -1
  ) {
    return res.status(400).send({
      status: "fail",
      message: "Invalid Url"
    });
  }
  return next();
};

export default checkUrl;
