"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Product_Color, {
        foreignKey: "product_id",
        as: "product_colors",
      });
      Product.hasMany(models.Comment, {
        foreignKey: "product_id",
        as: "comments",
      });
      Product.hasMany(models.Product_Sale, {
        foreignKey: "product_id",
        as: "product_sales",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      description: DataTypes.STRING,
      slug: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
