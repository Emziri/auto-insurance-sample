const { DataTypes } = require('sequelize');

/** define Person model for db */
function model(sequelize) {
  const attributes = {
    first: { type: DataTypes.STRING, allowNull: false },
    last: { type: DataTypes.STRING, allowNull: false },
    birth: { type: DataTypes.DATEONLY, allowNull: false },
    relation: { type: DataTypes.ENUM(["Spouse", "Parent", "Sibling", "Friend", "Other"]), allowNull: false }
  };


  return sequelize.define('Person', attributes, { timestamps: false });
}

module.exports = model;