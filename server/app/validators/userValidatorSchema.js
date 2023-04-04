const { body } = require('express-validator');

const registerValidator = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email invalid format'),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').notEmpty().withMessage('password is required')
]

const loginValidator = [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email invalid format'),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').notEmpty().withMessage('password is required')
]

const updateValidator = [
    body('name').notEmpty().withMessage('name is required')
]

const changePasswordValidator = [
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').notEmpty().withMessage('password is required'),
    body('confirm_password').notEmpty().withMessage('confirm_password is required').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
    }),
]

const resetPasswordValidator = [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email invalid format'),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').notEmpty().withMessage('password is required')
]

module.exports = {
    registerValidator,
    loginValidator,
    updateValidator,
    changePasswordValidator,
    resetPasswordValidator
}