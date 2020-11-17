const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getOne);
router.post('/create', restaurantController.createRestaurant);
router.patch('/update/:id', restaurantController.updateRestaurant);
router.delete(
  '/delete/:id',
  authController.restrictTo,
  restaurantController.deleteRestaurant
);

module.exports = router;
