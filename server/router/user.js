/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *       example:
 *         name: John Doe
 *         email: johndoe@email.com
 *         password: 123456789
 *         phone: 0811324444
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: johndoe@email.com
 *         password: 123456789
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /api/user/register:
 *   post:
 *     summary: Register a User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The registered User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /api/user/login:
 *   post:
 *     summary: Login for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Login for use.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 *
 */

const express = require('express'),
    router = express.Router(),
    controller = require('../app/controllers/userController'),
    validate = require('../app/middlewares/validate'),
    schema = require('../app/validators/userValidatorSchema'),
    checkToken = require('../app/middlewares/checkToken')

router.post('/register', validate(schema.registerValidator), controller.register);
router.post('/login', validate(schema.loginValidator), controller.login);
router.get('/profile', checkToken, controller.getProfile);
router.put('/update-profile', checkToken, validate(schema.updateValidator), controller.updateProfile);
router.put('/change-password', checkToken, validate(schema.changePasswordValidator), controller.changePassword);
router.put('/reset-password', validate(schema.resetPasswordValidator), controller.resetPassword);

module.exports = router