const { body } = require('express-validator');

const createValidator = [
    body('name').notEmpty().withMessage('name is required')
]

const updateValidator = [
    body('name').notEmpty().withMessage('name is required'),
    body('id').notEmpty().withMessage('id is required'),
]


module.exports = {
    createValidator,
    updateValidator
}