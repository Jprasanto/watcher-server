'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    open: DataTypes.INTEGER,
    close: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    high: DataTypes.INTEGER,
    low: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};