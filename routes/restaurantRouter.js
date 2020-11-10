const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getOne);
router.post('/create', restaurantController.createRestaurant);

module.exports = router;
