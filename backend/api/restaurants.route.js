import express from 'express';

import RestaurantsController from './restaurants.controller.js';

const router = express.Router();

router.get('/', RestaurantsController.apiGetRestaurants);
router.route('/cuisines').get(RestaurantsController.apiGetRestaurantCuisines);
router.route('/:restaurantId').get(RestaurantsController.apiGetRestaurantById);

export default router;
