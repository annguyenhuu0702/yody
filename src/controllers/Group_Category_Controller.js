const {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  _delete,
} = require("../services/Group_Category_Service");

const Group_Category_Controller = {
  getAll: async (req, res) => {
    const { status, data } = await getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await getById(req.params.id);
    res.status(status).json(data);
  },
  getBySlug: async (req, res) => {
    const { status, data } = await getBySlug(req.params.slug);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await update(req.body);
    res.status(status).json(data);
  },
  _delete: async (req, res) => {
    const { status, data } = await _delete(req.params.id);
    res.status(status).json(data);
  },
};
module.exports = Group_Category_Controller;
