'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Stock)
    }
  }
  Order.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "UserId is required" },
        notEmpty: { msg: "UserId is required" },
      }
    },
    StockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "StockId is required" },
        notEmpty: { msg: "StockId is required" },
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};