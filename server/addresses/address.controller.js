const express = require("express");
const addressService = require("./address.service");
const router = express.Router();

// APIs for the address model, used for testing. 

// router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', create);
// router.delete('/:id', _delete);

// module.exports = router;

function getAll(req, res, next) {
  addressService.getAll()
    .then(addresses => res.json(addresses))
    .catch(next);
}

function getById(req, res, next) {
  addressService.getById(req.params.id)
    .then(address => res.json(address))
    .catch(next);
}

function create(req, res, next) {
  addressService.create(req.body)
    .then(() => res.json({ message: 'address created' }))
    .catch(next);
}

function _delete(req, res, next) {
  addressService.delete(req.params.id)
    .then(() => res.json({ message: 'address deleted' }))
    .catch(next);
}
