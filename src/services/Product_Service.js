const db = require("../models");
const slugify = require("slugify");
const { Op } = require("sequelize");
const common_include = {
  raw: false,
  include: [
    {
      model: db.Product_Color,
      include: [
        { model: db.Product_Color_Size },
        { model: db.Product_Color_Image },
      ],
    },
    {
      model: db.Category,
      include: [
        { model: db.Group_Category, include: [{ model: db.Gender_Category }] },
      ],
    },
    {
      model: db.Comment,
      include: [{ model: db.User }],
    },
  ],
  nest: true,
};

const createFilter = (query) => {
  console.log(query);
  let { color, size, price, sortBy, sortType } = query;
  let splitItem;
  color = color ? JSON.parse(color) : [];
  size = size ? JSON.parse(size) : [];
  price = price ? JSON.parse(price) : [];
  if (color.length !== 0 || size.length !== 0 || price.length !== 0) {
    common_include.where = {
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
          [Op.or]: price.map((item) => {
            splitItem = item.split(";");
            if (item[0] === ";") {
              return {
                price: {
                  [Op.gte]: parseInt(splitItem[1]),
                },
              };
            }
            if (item[item.length - 1] === ";") {
              return {
                price: {
                  [Op.lte]: parseInt(splitItem[0]),
                },
              };
            }
            return {
              price: {
                [Op.gte]: parseInt(splitItem[0]),
                [Op.lte]: parseInt(splitItem[1]),
              },
            };
          }),
        },
      ],
    };
  }
  if (sortBy && sortType && sortBy !== "") {
    common_include.order = [[sortBy, sortType.toUpperCase()]];
  } else {
    delete common_include.order;
  }
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll(common_include);
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const search = async (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        ...common_include,
        where: {
          name: {
            [Op.like]: `%${q}%`,
          },
        },
      });
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByGenderCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      common_include.include[1].include[0].include[0].where = { slug };
      const products = await db.Product.findAll({
        ...common_include,
      });
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByGroupCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      common_include.include[1].include[0].where = { slug };
      createFilter(query);
      const products = await db.Product.findAll({
        ...common_include,
      });
      delete common_include.where;
      delete common_include.include[1].include[0].where;
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      common_include.include[1].where = { slug };
      createFilter(query);
      const products = await db.Product.findAll({
        ...common_include,
      });
      delete common_include.where;
      delete common_include.include[1].where;
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findOne({
        ...common_include,
        where: {
          slug,
        },
      });
      resolve({ status: 200, data: products });
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
      const { id, name } = body;
      const slug = slugify(name.toLowerCase());
      const existing_product = await db.Product.findOne({
        ...common_include,
        where: { id },
      });
      existing_product = {
        ...existing_product,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
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
  create,
  update,
  _delete,
};
