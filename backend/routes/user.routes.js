const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { body } = require('express-validator');
const authmiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],
 userController.loginUser
)
router.get('/profile',authmiddleware.authUser,userController.getUserProfile)
router.get('/logout',authmiddleware.authUser,userController.logOutUser)
module.exports = router;
