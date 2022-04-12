"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Code.hasMany(models.Order, {
        foreignKey: "code_id",
      });
    }
  }
  Code.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      value_vi: DataTypes.STRING,
      is_default: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Code",
    }
  );
  return Code;
};
