const db = require("../models");

const common_include = {
  nest: true,
  raw: false,
  include: [
    {
      model: db.Product,
    },
    { model: db.User },
  ],
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { content, rate, reply_to, product_id, user_id } = body;
      const new_comment = await db.Comment.create(
        {
          content,
          rate,
          reply_to,
          product_id,
          user_id,
        },
        common_include
      );

      resolve({ status: 200, data: new_comment });
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
      const existing_comment = await db.Comment.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      existing_comment = { ...existing_comment, ...body };
      resolve({ status: 200, data: existing_comment });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.destroy({
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

module.exports = { create, update, _delete };
