"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Sale.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Product_Sale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      percent: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
      finish: DataTypes.DATE,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Sale",
    }
  );
  return Product_Sale;
};
