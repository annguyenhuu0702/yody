const { create } = require("../services/Comment_Service");

const Comment_Controller = {
  create: async (req, res) => {
    const { status, data } = await create(req.body);
    res.status(status).json(data);
  },
};
module.exports = Comment_Controller;
