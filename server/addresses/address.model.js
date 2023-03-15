const { DataTypes } = require('sequelize');

/** define Address model for db */
function model(sequelize) {
  const attributes = {
    street: { type: DataTypes.STRING, allowNull: false },
    street2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: false, validate: { isNumeric: true, len: [5, 9] } },
  };


  return sequelize.define('Address', attributes, { timestamps: false });
}

module.exports = model;