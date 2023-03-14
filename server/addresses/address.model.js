const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    street: { type: DataTypes.STRING, allowNull: false },
    street2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: false },
  };


  return sequelize.define('Address', attributes);
}

module.exports = model;