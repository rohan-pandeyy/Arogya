const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authUser } = require('../middlewares/auth.middleware');
const { getCurrentUser } = require('../controllers/user.controller');

router.get('/me', authUser, getCurrentUser);

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.post('/logout', authMiddleware.authUser, userController.logoutUser);

router.put('/profile', authMiddleware.authUser, userController.updateUserProfile);


module.exports = router;