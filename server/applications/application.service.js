const db = require('../db');
const { getByIds: getVehiclesById } = require('../vehicles/vehicle.service');
const { getByIds: getPeopleById } = require('../people/person.service');

const getAll = async () => {
  //don't need all data at a glance, includes on single get only
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
  const application = new db.Application(aParams);
  await application.save();

  const vehicleIds = aParams.vehicleIds;
  if (vehicleIds && vehicleIds.length) {
    if (vehicleIds.length > 3) throw "Must have no more than 3 vehicles";
    const vehicles = await getVehiclesById(vehicleIds);
    if (!vehicles) throw "ERROR -- application created, but vehicles specified do not exist";
    application.setVehicles(vehicles);
  }

  const personIds = aParams.personIds;
  if (personIds && personIds.length) {
    const people = await getPeopleById(personIds);
    if (!people) throw "ERROR -- application created, but people specified do not exist";
    application.setPeople(people);
  }

  return application;
};

const update = async (id, aParams) => {
  const application = await getApplication(id);

  const vehicleIds = aParams.vehicleIds;
  if (vehicleIds && vehicleIds.length) {
    if (vehicleIds.length > 3) throw "Must have no more than 3 vehicles";
    const vehicles = await getVehiclesById(vehicleIds);
    if (!vehicles) throw "ERROR --  vehicles specified do not exist";
    application.setVehicles(vehicles);
  }
  const personIds = aParams.personIds;
  if (personIds && personIds.length) {
    const people = await getPeopleById(personIds);
    if (!people) throw "ERROR -- application created, but people specified do not exist";
    application.setPeople(people);
  }

  Object.assign(application, aParams);
  await application.save();
};

const validate = async (id) => {
  console.log('validated');
  return true;
}

// TODO: update

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