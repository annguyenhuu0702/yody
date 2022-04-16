"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_Item.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Cart_Item.belongsTo(models.Product_Color_Size, {
        foreignKey: "product_color_size_id",
        as: "product_color_size",
      });
    }
  }
  Cart_Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      product_color_size_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_Item",
    }
  );
  return Cart_Item;
};
