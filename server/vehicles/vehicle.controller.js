const express = require("express");
const vehicleService = require("./vehicle.service");
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
  vehicleService.getAll()
    .then(vehicles => res.json(vehicles))
    .catch(next);
}

function getById(req, res, next) {
  vehicleService.getById(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(next);
}

function create(req, res, next) {
  vehicleService.create(req.body)
    .then(() => res.json({ message: 'vehicle created' }))
    .catch(next);
}

function _delete(req, res, next) {
  vehicleService.delete(req.params.id)
    .then(() => res.json({ message: 'vehicle deleted' }))
    .catch(next);
}

// schema functions

//TODO: validation steps. see examples
//TODO: send vehicle as response when vehicle created???