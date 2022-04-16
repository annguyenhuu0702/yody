"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_User.belongsTo(models.Product, {
        foreignKey: "user_id",
        as: "product",
      });
      Product_User.belongsTo(models.User, {
        foreignKey: "product_id",
        as: "user",
      });
    }
  }
  Product_User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_User",
    }
  );
  return Product_User;
};
