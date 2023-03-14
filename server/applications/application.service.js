const db = require('../db');
const { getByIds: getVehiclesById, getOrCreate: getOrCreateVehicle } = require('../vehicles/vehicle.service');
const { getByIds: getPeopleById, getOrCreate: getOrCreatePerson } = require('../people/person.service');
const { getOrCreate: getOrCreateAddress } = require('../addresses/address.service');


const getAll = async () => {
  return await db.Application.findAll();
};

const getApplication = async (id) => {
  const application = await db.Application.findByPk(id, {
    include: [
      {
        model: db.Address,
        as: "address",
        attributes: ["street", "street2", "city", "state", "zip"]
      },
      {
        model: db.Vehicle,
        as: "vehicles",
        attributes: ["vin", "year", "make", "model"],
        through: {
          attributes: [],
        },
      },
      {
        model: db.Person,
        as: "people",
        attributes: ["first", "last", "birth"],
        through: {
          attributes: [],
        },
      }
    ]
  });
  if (!application) throw 'Application not found';

  return application;
};


const getById = async (id) => {
  return await getApplication(id);
};

const create = async (aParams) => {

  const address = aParams.address
  if (address) {
    const addr = await getOrCreateAddress(address);
    aParams.addressId = addr.dataValues.id;
  }

  // TODO verify if you pass addressId, it exists
  // some sort of validation step to throw bad request???

  const application = new db.Application(aParams);
  await application.save();

  const vehicles = aParams.vehicles
  if (vehicles?.length > 0) {
    await setVehicles(application, vehicles);
  }

  const people = aParams.people
  if (people?.length > 0) {
    await setPeople(application, people);
  }

  return application;
};

const update = async (id, aParams) => {
  const application = await getApplication(id);

  const address = aParams.address
  if (address) {
    const addr = await getOrCreateAddress(address);
    aParams.addressId = addr.dataValues.id;
  }

  const vehicles = aParams.vehicles
  if (vehicles?.length > 0) {
    await setVehicles(application, vehicles);
  }

  const people = aParams.people
  if (people?.length > 0) {
    await setPeople(application, people);
  }


  Object.assign(application, aParams);
  await application.save();
};


const setVehicles = async (application, vehicles) => {
  if (vehicles.length === 0) return;
  if (vehicles.length > 3) throw "Must have no more than 3 vehicles";

  vehicles = await Promise.all(vehicles.map(async (vehicle) => await getOrCreateVehicle(vehicle)));
  if (!vehicles) throw "ERROR -- could not retrieve given vehicles";
  application.setVehicles(vehicles);
}

const setPeople = async (application, people) => {
  if (people.length === 0) return;

  people = await Promise.all(people.map(async (person) => await getOrCreatePerson(person)));
  if (!people) throw "ERROR -- could not retrieve given people";
  application.setPeople(people);
}

const validate = async (id) => {
  console.log('validated');
  return true;
}

const _delete = async (id) => {
  const application = await getApplication(id);
  await application.destroy();
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  validate,
  delete: _delete
};