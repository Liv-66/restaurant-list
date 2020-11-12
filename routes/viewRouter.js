const express = require('express');
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', viewController.getOverview);
// router.get('/tour/:slug', authController.isLogedIn, viewController.getTour);
router.get('/login', viewController.login);
router.get('/restaurant', viewController.getRestaurants);
router.get('/restaurant/new', viewController.newRestaurant);
// router.get('/me', authController.protect, viewController.getMe);

module.exports = router;