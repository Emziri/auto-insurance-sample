const express = require("express");
const personService = require("./person.service");
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  personService.getAll()
    .then(people => res.json(people))
    .catch(next);
}

function getById(req, res, next) {
  personService.getById(req.params.id)
    .then(person => res.json(person))
    .catch(next);
}

function create(req, res, next) {
  personService.create(req.body)
    .then(() => res.json({ message: 'person created' }))
    .catch(next);
}

function _delete(req, res, next) {
  personService.delete(req.params.id)
    .then(() => res.json({ message: 'person deleted' }))
    .catch(next);
}

// schema functions

//TODO: validation steps. see examples
//TODO: send person as response when person created???