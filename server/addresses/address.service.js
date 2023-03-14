const db = require('../db');

const getAll = async () => {
  return await db.Address.findAll();
};

const getAddress = async (id) => {
  const address = await db.Address.findByPk(id);
  if (!address) throw 'Address not found';
  return address;
};

const getById = async (id) => {
  return await getAddress(id);
};

const create = async (aParams) => {
  const address = new db.Address(aParams);
  await address.save();
};

const _delete = async (id) => {
  const address = await getAddress(id);
  await address.destroy();
};


module.exports = {
  getAll,
  getById,
  create,
  delete: _delete
};