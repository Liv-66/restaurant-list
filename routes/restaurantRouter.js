const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getAll);
router.post('/create', restaurantController.createRestaurant);

module.exports = router;
