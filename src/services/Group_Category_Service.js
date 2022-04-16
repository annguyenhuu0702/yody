const db = require("../models");

const common_include = {
  raw: false,
  include: [
    {
      model: db.Category,
      as: "categories",
    },
    {
      model: db.Gender_Category,
      as: "gender_category",
    },
  ],
  nest: true,
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const group_categories = await db.Group_Category.findAll(common_include);
      resolve({ status: 200, data: group_categories });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const group_category = await db.Group_Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: group_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const group_category = await db.Group_Category.findOne({
        ...common_include,
        where: {
          slug,
        },
      });
      resolve({ status: 200, data: group_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { full_name } = body;
      const slug = slugify(full_name.toLowerCase());
      const new_group_category = await db.Gender_Category.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_group_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, short_name } = body;
      const slug = slugify(short_name.toLowerCase());
      const existing_group_category = await db.Group_Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });

      existing_group_category = {
        ...existing_group_category,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_group_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Group_Category.destroy({
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
  getBySlug,
  create,
  _delete,
  update,
  getById,
};
