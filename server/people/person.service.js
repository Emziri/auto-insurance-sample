const db = require('../db');

const getAll = async () => {
  return await db.Person.findAll();
};

const getPerson = async (id) => {
  const person = await db.Person.findByPk(id);
  if (!person) throw 'Person not found';
  return person;
};

const getById = async (id) => {
  return await getPerson(id);
};

const getByIds = async (ids) => {
  const people = await db.Person.findAll({
    where: {
      id: ids
    }
  });
  if (!people) throw 'People not found';
  return people;
};

const create = async (pParams) => {
  const person = new db.Person(pParams);
  await person.save();
};

const getOrCreate = async (pParams) => {
  let person = await db.Person.findOne({ where: { ...pParams } })
  if (person) {
    return person;
  }

  person = new db.Person(pParams);
  await person.save();
  return person;
}

const _delete = async (id) => {
  const person = await getPerson(id);
  await person.destroy();
};


module.exports = {
  getAll,
  getById,
  getByIds,
  create,
  getOrCreate,
  delete: _delete
};