const db = require('../db');

const getAll = async () => {
  return await db.Vehicle.findAll();
};

const getVehicle = async (id) => {
  const vehicle = await db.Vehicle.findByPk(id);
  if (!vehicle) throw 'Vehicle not found';
  return vehicle;
};

const getById = async (id) => {
  return await getVehicle(id);
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

const create = async (vParams) => {
  if (await db.Vehicle.findOne({ where: { vin: vParams.vin } })) {
    throw 'Error -- vehicle with given VIN already exists';
  }

  const vehicle = new db.Vehicle(vParams);
  await vehicle.save();
};

const _delete = async (id) => {
  const vehicle = await getVehicle(id);
  await vehicle.destroy();
};


module.exports = {
  getAll,
  getById,
  getByIds,
  create,
  delete: _delete
};