const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    { model: db.User },
    {
      model: db.Product_Color_Size,
      include: [
        {
          model: db.Product_Color,
          include: [
            {
              model: db.Product,
              inClude: [
                {
                  model: db.Category,
                  include: [
                    {
                      model: db.Group_Category,
                      inClude: [{ model: db.Gender_Category }],
                    },
                  ],
                },
              ],
            },
            {
              model: db.Product_Color_Image,
            },
          ],
        },
      ],
    },
  ],
};

const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart_items = await db.Cart_Item.findAll({
        ...common_include,
        where: {
          user_id,
        },
      });
      resolve({ status: 200, data: cart_items });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart_item = await db.Cart_Item.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: cart_item });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const create = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { product_color_size_id, quantity } = body;
      let existing_cart_item = await db.Cart_Item.findOne({
        ...common_include,
        where: {
          product_color_size_id,
          user_id: user.id,
        },
      });

      if (existing_cart_item) {
        existing_cart_item.quantity += quantity;
        await existing_cart_item.save();
        resolve({ status: 200, data: existing_cart_item });
      } else {
        const new_cart_item = await db.Cart_Item.create({
          ...body,
          user_id: user.id,
        });
        existing_cart_item = await db.Cart_Item.findOne({
          ...common_include,
          where: {
            id: new_cart_item.id,
          },
        });
        resolve({ status: 200, data: existing_cart_item });
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { product_color_size_id, quantity } = body;
      if (quantity < 0) {
        resolve({ status: 500, data: "Invalid quantity" });
      } else {
        const existing_cart_item = await db.Cart_Item.findOne({
          ...common_include,
          where: {
            product_color_size_id,
            user_id: user.id,
          },
        });
        if (quantity === 0) {
          await _delete(existing_cart_item.id);
          resolve({ status: 200, data: null });
        } else {
          existing_cart_item.quantity = quantity;
          await existing_cart_item.save();
          resolve({ status: 200, data: existing_cart_item });
        }
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Cart_Item.destroy({
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

module.exports = { getByUser, create, _delete, update, getById };
