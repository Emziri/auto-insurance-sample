const { DataTypes } = require('sequelize');
const RELATIONS = ["Spouse", "Parent", "Sibling", "Friend", "Other"];

/** define Person model for db */
function model(sequelize) {
  const attributes = {
    first: { type: DataTypes.STRING, allowNull: false },
    last: { type: DataTypes.STRING, allowNull: false },
    birth: {
      type: DataTypes.DATEONLY, allowNull: false, validate: {
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
    relation: {
      type: DataTypes.ENUM(RELATIONS), allowNull: false, validate: {
        isIn: [RELATIONS]
      }
    }
  };


  return sequelize.define('Person', attributes, { timestamps: false });
}

module.exports = model;