const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    first: { type: DataTypes.STRING },
    last: { type: DataTypes.STRING },
    birth: { type: DataTypes.DATEONLY },
  };


  return sequelize.define('Application', attributes);
}

module.exports = model;