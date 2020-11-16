const express = require('express');
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', viewController.getOverview);
// router.get('/tour/:slug', authController.isLogedIn, viewController.getTour);
router.get('/login', viewController.login);
router.get('/signup', viewController.signup);
router.get(
  '/restaurants',
  userController.isLogedIn,
  viewController.getRestaurants
);
router.get(
  '/restaurant/new',
  userController.isLogedIn,
  viewController.newRestaurant
);
router.get('/update/:id', viewController.updateRestaurant);
// router.get('/me', authController.protect, viewController.getMe);

module.exports = router;
