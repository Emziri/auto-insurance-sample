const db = require('../db');

/** get list of all vehicles */
const getAll = async () => {
  return await db.Vehicle.findAll();
};

/** get vehicle by id
 *  @param {number} id
 */
const getVehicle = async (id) => {
  const vehicle = await db.Vehicle.findByPk(id);
  if (!vehicle) throw 'Vehicle not found';
  return vehicle;
};

/** get list of vehicles by list of ids
 *  @param {number[]} ids 
 */
const getByIds = async (ids) => {
  const vehicles = await db.Vehicle.findAll({
    where: {
      id: ids
    }
  });
  if (!vehicles) throw 'Vehicles not found';
  return vehicles;
};

// TODO remove doc comments

/** get vehicle if it exists in db, else create one
 * @param vParams
 */
const getOrCreate = async (vParams) => {
  let vehicle = await db.Vehicle.findOne({ where: { ...vParams } });
  if (vehicle) {
    return vehicle;
  }

  vehicle = new db.Vehicle(vParams);
  await vehicle.save();
  return vehicle
};

/** create vehicle
 * @params vParams
 */
const create = async (vParams) => {
  vehicle = new db.Vehicle(vParams);
  await vehicle.save();
  return vehicle
};

/** delete vehicle by id 
 * @params {number} id
*/
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