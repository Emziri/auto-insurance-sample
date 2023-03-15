const db = require('../db');

// service for vehicle model CRUD

const getAll = async () => {
  return await db.Vehicle.findAll();
};

const getVehicle = async (id) => {
  const vehicle = await db.Vehicle.findByPk(id);
  if (!vehicle) throw 'Vehicle not found';
  return vehicle;
};

const getByIds = async (ids) => {
  const vehicles = await db.Vehicle.findAll({
    where: {
      id: ids
    }
  });
  if (!vehicles) throw 'Vehicles not found';
  return vehicles;
};

const getOrCreate = async (vParams) => {
  let vehicle = await db.Vehicle.findOne({ where: { ...vParams } });
  if (vehicle) {
    return vehicle;
  }

  vehicle = new db.Vehicle(vParams);
  await vehicle.save();
  return vehicle;
};

const create = async (vParams) => {
  const vehicle = new db.Vehicle(vParams);
  await vehicle.save();
  return vehicle;
};

const _delete = async (id) => {
  const vehicle = await getVehicle(id);
  await vehicle.destroy();
};


module.exports = {
  getAll,
  getByIds,
  getById: getVehicle,
  create,
  getOrCreate,
  delete: _delete
};