const db = require("../models");
const slugify = require("slugify");
// const client = require("../config/configElasticSearch");
const { Op, where } = require("sequelize");
const limitProduct = 5;
const common_include = {
  attributes: { exclude: ["category_id"] },
  raw: false,
  include: [
    {
      model: db.Product_Color,
      as: "product_colors",
      attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
      required: true,
      include: [
        {
          model: db.Product_Color_Size,
          as: "product_color_sizes",
          attributes: {
            exclude: ["product_color_id", "createdAt", "updatedAt"],
          },
          required: true,
        },
        {
          model: db.Product_Color_Image,
          as: "product_color_images",
          attributes: {
            exclude: ["product_color_id", "createdAt", "updatedAt"],
          },
          required: true,
        },
      ],
    },
    {
      model: db.Category,
      as: "category",
      required: true,
      attributes: { exclude: ["group_category_id"] },
      include: [
        {
          model: db.Group_Category,
          as: "group_category",
          attributes: {
            exclude: ["gender_category_id", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Gender_Category,
              as: "gender_category",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              required: true,
            },
          ],
          required: true,
        },
      ],
    },
    {
      model: db.Comment,
      as: "comments",
      attributes: {
        exclude: ["product_id"],
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    },
  ],
  nest: true,
};
const countProduct = async (where) => {
  let total = await db.Product.count({
    nested: true,
    raw: false,
    include: [
      {
        model: db.Category,
        as: "category",
        attributes: [],
        include: [
          {
            model: db.Group_Category,
            as: "group_category",
            attributes: [],
            include: [
              {
                model: db.Gender_Category,
                as: "gender_category",
                attributes: [],
              },
            ],
          },
        ],
      },
    ],
    where,
  });
  return total;
};
const createFilter = (query) => {
  let { color, size, price, sortBy, sortType, p } = query;
  let newInclude = { ...common_include };
  color = color ? JSON.parse(color) : [];
  size = size ? JSON.parse(size) : [];
  price = price ? JSON.parse(price) : [];
  if (color.length !== 0 || size.length !== 0 || price.length !== 0) {
    newInclude.where = {
      [Op.or]: [
        {
          "$Product_Colors.color$": {
            [Op.in]: color,
          },
        },
        {
          "$Product_Colors.Product_Color_Sizes.size_text$": {
            [Op.in]: size,
          },
        },
        {
          price: {
            [Op.gte]: price[0],
            [Op.lte]: price[1],
          },
        },
      ],
    };
  }
  if (sortBy && sortType && sortBy !== "") {
    newInclude.order = [[sortBy, sortType.toUpperCase()]];
  } else {
    delete newInclude.order;
  }

  return newInclude;
};
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll(common_include);
      resolve({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const getByStatistics = async (user, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        include: [
          {
            model: db.Product_Color,
            as: "product_colors",
            include: [
              {
                model: db.Product_Color_Size,
                as: "product_color_sizes",
                include: [
                  {
                    model: db.Order_Item,
                    as: "order_items",
                  },
                ],
              },
              {
                model: db.Product_Color_Image,
                as: "product_color_images",
              },
            ],
          },
          {
            model: db.Product_User,
            as: "product_users",
          },
        ],
        group: "product.id",
        order: [
          [
            db.sequelize.fn(
              "sum",
              db.sequelize.col(
                "product_colors.product_color_sizes.order_items.quantity"
              )
            ),
            "DESC",
          ],
        ],
        where: {
          "$product_colors.product_color_sizes.order_items.id$": {
            [Op.not]: null,
          },
        },
      });
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const search = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { q, limit } = query;
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      const result = await client.search({
        index: "products",
        query: {
          multi_match: {
            query: q,
            fields: [
              "name",
              "product_colors.color",
              "product_colors.product_color_sizes.size_text",
            ],
          },
        },
        size: _limit,
      });
      resolve({
        status: 200,
        data: {
          products: result.hits.hits.map((item) => item._source),
          total_page: Math.ceil(result.hits.total.value / _limit),
        },
      });
    } catch (error) {
      // console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByGenderCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      console.log(query);
      const where = {
        "$Category.Group_Category.Gender_Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      common_include.where = where;
      let products = [];
      let total = await countProduct(where);
      products = await db.Product.findAll({
        ...createFilter(query),
        limit: _limit,
        offset: _limit * ((!p ? 1 : p) - 1),
      });
      delete common_include.where;
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByGroupCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      const where = {
        "$Category.Group_Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      common_include.where = where;
      let products = [];
      let total = await countProduct(where);
      products = await db.Product.findAll({
        ...createFilter(query),
        limit: _limit,
        offset: _limit * ((!p ? 1 : p) - 1),
      });
      delete common_include.where;
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByCollectionId = async (collection_id, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const option = { ...createFilter(query) };
      option.include.push({
        model: db.Collection_Item,
        as: "collection_items",
        include: [
          {
            model: db.Collection,
            as: "collection",
            where: {
              id: collection_id,
            },
          },
        ],
      });
      const products = await db.Product.findAll({
        ...option,
      });

      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      const where = {
        "$Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      common_include.where = where;
      let products = [];
      let total = await countProduct(where);
      products = await db.Product.findAll({
        ...createFilter(query),
        limit: _limit,
        offset: _limit * ((!p ? 1 : p) - 1),
      });
      delete common_include.where;
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        raw: false,
        include: [
          {
            model: db.Product_Color,
            as: "product_colors",
            include: [
              { model: db.Product_Color_Size, as: "product_color_sizes" },
              {
                model: db.Product_Color_Image,
                as: "product_color_images",
              },
            ],
          },
          {
            model: db.Category,
            as: "category",
            include: [
              {
                model: db.Group_Category,
                as: "group_category",
                include: [{ model: db.Gender_Category, as: "gender_category" }],
              },
            ],
          },
          {
            model: db.Comment,
            as: "comments",
            include: [{ model: db.User, as: "user" }],
          },
        ],
        nest: true,
        where: { slug },
      });
      resolve({ status: 200, data: product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = slugify(name.toLowerCase());
      const new_product = await db.Product.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name, price } = body;
      const slug = slugify(name.toLowerCase());
      let existing_product = await db.Product.findOne({
        where: { id },
        raw: true,
      });
      if (existing_product) {
        const newProduct = {
          ...existing_product,
          ...body,
          slug,
        };
        await db.Product.update(newProduct, { where: { id } });
        await client.update({
          index: "products",
          id: id,
          doc: { name, price },
        });

        resolve({ status: 200, data: newProduct });
      }
      resolve({
        status: 404,
        data: {
          message: "Product not found",
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.destroy({
        where: {
          id,
        },
      });
      await client.delete({ index: "products", id });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = {
  getAll,
  search,
  getByGenderCategorySlug,
  getByGroupCategorySlug,
  getByCategorySlug,
  getBySlug,
  getByCollectionId,
  create,
  update,
  _delete,
  getByStatistics,
};
