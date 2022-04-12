const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Product_Color,
      include: [{ model: db.Product }, { model: db.Product_Color_Image }],
    },
  ],
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_color_size = await db.Product_Color_Size.findOne({
        ...common_include,
        where: { id },
      });
      resolve({ status: 200, data: product_color_size });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_color_size = await db.Product_Color_Size.create(body);
      resolve({ status: 200, data: product_color_size });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = body;
      const existing_product_color_size = await db.Product_Color_Size.findOne({
        ...common_include,
        where: { id },
      });
      existing_product_color_size = {
        ...existing_product_color_size,
        ...body,
      };
      resolve({ status: 200, data: existing_product_color_size });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product_Color_Size.destroy({
        where: { id },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = { getById, create, update, _delete };
