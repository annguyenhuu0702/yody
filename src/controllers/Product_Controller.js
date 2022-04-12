const {
  getAll,
  search,
  getBySlug,
  create,
  update,
  _delete,
  getByGenderCategorySlug,
  getByGroupCategorySlug,
  getByCategorySlug,
} = require("../services/Product_Service");

const Gender_Category_Controller = {
  getAll: async (req, res) => {
    const { status, data } = await getAll();
    res.status(status).json(data);
  },
  search: async (req, res) => {
    const { status, data } = await search(req.query.q);
    res.status(status).json(data);
  },
  getByGenderCategorySlug: async (req, res) => {
    const { status, data } = await getByGenderCategorySlug(
      req.params.gender_category_slug
    );
    res.status(status).json(data);
  },
  getByGroupCategorySlug: async (req, res) => {
    const { status, data } = await getByGroupCategorySlug(
      req.query,
      req.params.group_category_slug
    );
    res.status(status).json(data);
  },
  getByCategorySlug: async (req, res) => {
    const { status, data } = await getByCategorySlug(
      req.query,
      req.params.category_slug
    );
    res.status(status).json(data);
  },
  getBySlug: async (req, res) => {
    const { status, data } = await getBySlug(req.params.product_slug);
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
module.exports = Gender_Category_Controller;
