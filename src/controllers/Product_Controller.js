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
  getByCollectionId,
  getByStatistics,
} = require("../services/Product_Service");

const Product_Controller = {
  getAll: async (req, res) => {
    const { status, data } = await getAll(req.query);
    res.status(status).json(data);
  },
  getByStatistics: async (req, res) => {
    const { status, data } = await getByStatistics(req.user, req.query);
    res.status(status).json(data);
  },
  search: async (req, res) => {
    const { status, data } = await search(req.query);
    res.status(status).json(data);
  },
  getByGenderCategorySlug: async (req, res) => {
    const { status, data } = await getByGenderCategorySlug(
      req.query,
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
    const { status, data } = await getBySlug(
      req.query,
      req.params.product_slug
    );
    res.status(status).json(data);
  },
  getByCollectionId: async (req, res) => {
    const { status, data } = await getByCollectionId(
      req.params.collection_id,
      req.query
    );
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
module.exports = Product_Controller;
