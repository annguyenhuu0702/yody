"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Color_Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Color_Size.belongsTo(models.Product_Color, {
        foreignKey: "product_color_id",
      });
      Product_Color_Size.hasMany(models.Cart_Item, {
        foreignKey: "product_color_size_id",
      });
    }
  }
  Product_Color_Size.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      size_text: DataTypes.STRING,
      size_value: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      product_color_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Color_Size",
    }
  );
  return Product_Color_Size;
};
