const db = require("../models");
const slugify = require("slugify");

const common_include = {
  raw: false,
  include: [
    {
      model: db.Group_Category,
      as: "group_categories",
      include: [
        {
          model: db.Category,
          as: "categories",
          include: [
            {
              model: db.Group_Category,
              as: "group_category",
              include: [{ model: db.Gender_Category, as: "gender_category" }],
            },
          ],
        },
        {
          model: db.Gender_Category,
          as: "gender_category",
        },
      ],
    },
  ],
  nest: true,
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const gender_categories = await db.Gender_Category.findAll(
        common_include
      );
      resolve({ status: 200, data: gender_categories });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gender_category = await db.Gender_Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: gender_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gender_category = await db.Gender_Category.findOne({
        ...common_include,
        where: {
          slug,
        },
      });
      resolve({ status: 200, data: gender_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { short_name } = body;
      const slug = slugify(short_name.toLowerCase());
      const new_gender_category = await db.Gender_Category.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_gender_category });
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
      const existing_gender_category = await db.Gender_Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });

      existing_gender_category = {
        ...existing_gender_category,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_gender_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Gender_Category.destroy({
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

module.exports = { getAll, getBySlug, create, _delete, update, getById };
