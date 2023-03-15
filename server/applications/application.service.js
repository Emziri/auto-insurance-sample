const db = require('../db');
const { getByIds: getVehiclesById, getOrCreate: getOrCreateVehicle } = require('../vehicles/vehicle.service');
const { getByIds: getPeopleById, getOrCreate: getOrCreatePerson } = require('../people/person.service');
const { getOrCreate: getOrCreateAddress } = require('../addresses/address.service');


const getAll = async () => {
  return await db.Application.findAll();
};

//get full application response and its relations
const getApplication = async (id) => {
  const application = await db.Application.findByPk(id, {
    include: [
      {
        model: db.Address,
        as: "address",
      },
      {
        model: db.Vehicle,
        as: "vehicles",
        through: {
          attributes: [],
        },
      },
      {
        model: db.Person,
        as: "people",
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

//create new application by partial application information
const create = async (aParams) => {

  //address
  const address = aParams.address;
  if (address) {
    const addr = await getOrCreateAddress(address);
    aParams.addressId = addr.dataValues.id;
  } else if (aParams.addressId) {
    const addr = await db.Address.findOne({ where: { id: aParams.addressId } });
    if (!addr) throw "passed address id does not exist";
  }

  const application = new db.Application(aParams);
  await application.save();

  //create any new vehicles and set vehicle relations
  const vehicles = aParams.vehicles;
  if (vehicles?.length > 0) {
    await setVehicles(application, vehicles);
  }

  //create any new people and set people relations
  const people = aParams.people;
  if (people?.length > 0) {
    await setPeople(application, people);
  }

  return application;
};

const update = async (id, aParams) => {
  const application = await getApplication(id);

  //address details
  const address = aParams.address;
  if (address) {
    const addr = await getOrCreateAddress(address);
    aParams.addressId = addr.dataValues.id;
  } else if (aParams.addressId) {
    const addr = await db.Address.findOne({ where: { id: aParams.addressId } });
    if (!addr) throw "passed address id does not exist";
  }

  //create any new vehicles and set vehicle relations
  const vehicles = aParams.vehicles;
  if (vehicles?.length > 0) {
    await setVehicles(application, vehicles);
  }

  //create any new people and set people relations
  const people = aParams.people;
  if (people?.length > 0) {
    await setPeople(application, people);
  }

  //handles client info and the address id if it was valid
  Object.assign(application, aParams);
  await application.save();
};

// set vehicles - applications relationships 
const setVehicles = async (application, vehicles) => {
  if (vehicles.length === 0) return;
  if (vehicles.length > 3) throw "Must have no more than 3 vehicles";

  vehicles = await Promise.all(vehicles.map(async (vehicle) => await getOrCreateVehicle(vehicle)));
  if (!vehicles) throw "ERROR -- could not retrieve given vehicles";
  application.setVehicles(vehicles);
};

// set people - applications relationships
const setPeople = async (application, people) => {
  if (people.length === 0) return;

  people = await Promise.all(people.map(async (person) => await getOrCreatePerson(person)));
  if (!people) throw "ERROR -- could not retrieve given people";
  application.setPeople(people);
};

const validate = async (id) => {
  const application = await getApplication(id);
  const errors = [];
  if (!application) errors.push("Error: Application doesn't exist");

  const appData = { ...application.dataValues };

  //client info
  if (!appData.first || !appData.last || !appData.birth) {
    errors.push("Error: Client information missing");
  }

  //address
  const address = appData.address;
  if (!address) {
    errors.push("Error: No address");
  } else if (!address.street || !address.city || !address.state || !address.zip) {
    errors.push("Error: Incomplete address");
  }

  //vehicles
  const vehicles = appData.vehicles;
  if (!vehicles || vehicles.length === 0) {
    errors.push("Error: Application must have at least one vehicle");
  }
  if (vehicles && vehicles.length > 3) {
    errors.push("Error: Application must have no more than 3 vehicles");
  }

  //additional people are not mandatory for quote
  if (errors.length) throw errors;
  return { message: `Quote: $${Math.floor(Math.random() * (5000 - 500) + 500)}.00y` };
};

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