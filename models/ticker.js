'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticker.hasMany(models.Watchlist)
    }
  }
  Ticker.init({
    name: DataTypes.STRING,
    symbol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticker',
  });
  return Ticker;
};