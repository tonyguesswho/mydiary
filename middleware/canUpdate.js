import query from "../models/query";

const canUpdate = (req, res, next) => {
  const todayDate = new Date();
  const month = parseInt(todayDate.getMonth(), 10);
  const year = parseInt(todayDate.getFullYear(), 10);
  const day = parseInt(todayDate.getDate(), 10);
  const { id } = req.params;
  const userid = req.userData.userId;
  query
    .getOneEntry(userid, id)
    .then(data => {
      const createdDate = new Date(data.created_at);
      const createdMonth = parseInt(createdDate.getMonth(), 10);
      const createdYear = parseInt(createdDate.getFullYear(), 10);
      const createdDay = parseInt(createdDate.getDate(), 10);

      if (
        year === createdYear &&
        month === createdMonth &&
        day === createdDay
      ) {
        return next();
      }
      return res.status(400).json({
        status: "fail",
        message: "You can only update entries on the day it was created "
      });
    })
    .catch(() => {
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      });
    });
};

export default canUpdate;
