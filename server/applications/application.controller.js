const express = require("express");
const applicationService = require("./application.service");
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  applicationService.getAll()
    .then(applications => res.json(applications))
    .catch(next);
}

function getById(req, res, next) {
  applicationService.getById(req.params.id)
    .then(application => res.json(application))
    .catch(next);
}

function create(req, res, next) {
  applicationService.create(req.body)
    .then((appl) => res.json({ applicationUrl: `http://localhost:3000/applications/${appl.dataValues.id}` }))
    .catch(next);
}

function update(req, res, next) {
  applicationService.update(req.params.id, req.body)
    .then(() => res.json({ message: 'application updated' }))
    .catch(next);
}

function _delete(req, res, next) {
  applicationService.delete(req.params.id)
    .then(() => res.json({ message: 'application deleted' }))
    .catch(next);
}

// schema functions

//TODO: validation steps. see examples
