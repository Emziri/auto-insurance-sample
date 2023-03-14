const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    first: { type: DataTypes.STRING, allowNull: false },
    last: { type: DataTypes.STRING, allowNull: false },
    birth: { type: DataTypes.DATEONLY, allowNull: false },
  };


  return sequelize.define('Person', attributes);
}

module.exports = model;