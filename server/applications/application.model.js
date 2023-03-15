const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    first: { type: DataTypes.STRING },
    last: { type: DataTypes.STRING },
    birth: {
      type: DataTypes.DATEONLY, validate: {
        isDate: true,
        isSixteen(value) {
          const dob = new Date(value);
          if (Date.now() < dob.getTime()) throw new Error('must be 16 years old');
          const ageDt = new Date(Date.now() - dob.getTime());
          const age = Math.abs(ageDt.getUTCFullYear() - 1970);
          if (age <= 16) throw new Error('must be 16 years old');
        }
      }
    },
  };


  return sequelize.define('Application', attributes, { timestamps: false });
}

module.exports = model;