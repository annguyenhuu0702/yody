"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Color_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Color_Image.belongsTo(models.Product_Color, {
        foreignKey: "product_color_id",
      });
    }
  }
  Product_Color_Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: DataTypes.STRING,
      is_thumbnail: DataTypes.BOOLEAN,
      product_color_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Color_Image",
    }
  );
  return Product_Color_Image;
};
