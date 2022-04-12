"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_Item.belongsTo(models.Order, {
      //   foreignKey: "order_id",
      // });
      // Order_Item.belongsTo(models.Product_Color, {
      //   foreignKey: "product_color_id",
      // });

      models.Product_Color.belongsToMany(models.Order, {
        through: Order_Item,
      });
    }
  }
  Order_Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      product_color_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Item",
    }
  );
  return Order_Item;
};
