"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: "category_id",
        as: "products",
      });
      Category.belongsTo(models.Group_Category, {
        foreignKey: "group_category_id",
        as: "group_category",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      description: DataTypes.STRING,
      icon: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      slug: DataTypes.STRING,
      group_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
