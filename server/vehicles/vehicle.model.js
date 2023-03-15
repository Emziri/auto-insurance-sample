const { DataTypes } = require('sequelize');

/** define Vehicle model for db */
function model(sequelize) {
  const attributes = {
    vin: { type: DataTypes.STRING, allowNull: false },
    year: { type: 'YEAR(4)', allowNull: false, validate: { isInt: true, min: 1985, max: new Date().getFullYear() + 1 } },
    make: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false }
  };

  return sequelize.define('Vehicle', attributes, { timestamps: false });
}

module.exports = model;