"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gender_Category.hasMany(models.Group_Category, {
        foreignKey: "gender_category_id",
      });
    }
  }
  Gender_Category.init(
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
    },
    {
      sequelize,
      modelName: "Gender_Category",
    }
  );
  return Gender_Category;
};
