"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group_Category.hasMany(models.Category, {
        foreignKey: "group_category_id",
        as: "categories",
      });
      Group_Category.belongsTo(models.Gender_Category, {
        foreignKey: "gender_category_id",
        as: "gender_category",
      });
    }
  }
  Group_Category.init(
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
      gender_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group_Category",
    }
  );
  return Group_Category;
};
