"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      reply_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
