const express = require("express");
const vehicleService = require("./vehicle.service");
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', _delete);

module.exports = router;

/** get all vehicles endpoint */
function getAll(req, res, next) {
  vehicleService.getAll()
    .then(vehicles => res.json(vehicles))
    .catch(next);
}

/** get vehicle by id endpoint */
function getById(req, res, next) {
  vehicleService.getById(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(next);
}

/** create vehicle endpoint */
function create(req, res, next) {
  vehicleService.create(req.body)
    .then(() => res.json({ message: 'vehicle created' }))
    .catch(next);
}

/** delete vehicle endpoint */
function _delete(req, res, next) {
  vehicleService.delete(req.params.id)
    .then(() => res.json({ message: 'vehicle deleted' }))
    .catch(next);
}

// schema functions

//TODO: validation steps. see examples
