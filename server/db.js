const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

const config = {
  "database": {
    "host": "localhost",
    "port": 3306, //the port your mysql server listens to
    "user": "root", //your mysql account name
    "password": "MyPotatoBase01!", //your mysql password
    "database": "node-app-challenge"
  }
};

initialize();

async function initialize() {
  // create db if not exists
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', logging: false });

  // init models and add to db object
  db.Vehicle = require('./vehicles/vehicle.model')(sequelize);
  db.Person = require('./people/person.model')(sequelize);
  db.Address = require('./addresses/address.model')(sequelize);
  db.Application = require('./applications/application.model')(sequelize);

  // define relations
  db.Address.hasMany(db.Application, { foreignKey: 'addressId' });
  db.Application.belongsTo(db.Address, { foreignKey: 'addressId', as: "address" });

  db.Application.belongsToMany(db.Vehicle, { foreignKey: 'applicationId', as: "vehicles", through: "ApplicationsVehicles" });
  db.Vehicle.belongsToMany(db.Application, { foreignKey: 'vehicleId', through: "ApplicationsVehicles" });

  db.Application.belongsToMany(db.Person, { foreignKey: 'applicationId', as: "people", through: "ApplicationsPeople" });
  db.Person.belongsToMany(db.Application, { foreignKey: 'personId', through: "ApplicationsPeople" });


  // sync models to db
  await sequelize.sync({ alter: true });
}