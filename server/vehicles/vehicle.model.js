const { DataTypes } = require('sequelize');

/** define Vehicle model for db */
function model(sequelize) {
  const attributes = {
    vin: { type: DataTypes.STRING, allowNull: false },
    year: { type: 'YEAR(4)', allowNull: false },
    make: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false }
  };

  //TODO validate year is in range

  return sequelize.define('Vehicle', attributes, { timestamps: false });
}

module.exports = model;