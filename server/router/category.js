const express = require('express'),
    router = express.Router(),
    controller = require('../app/controllers/categoryController'),
    validate = require('../app/middlewares/validate'),
    schema = require('../app/validators/categoryValidatorSchema'),
    checkToken = require('../app/middlewares/checkToken')

router.post('/create', checkToken, validate(schema.createValidator), controller.create);
router.put('/update', checkToken, validate(schema.updateValidator), controller.update);
router.get('/:id', checkToken, controller.findById);
router.delete('/:id', checkToken, controller.destroy);
router.get('/', checkToken, controller.list);

module.exports = router