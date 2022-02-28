import RestaurantsDAO from '../dao/restaurants.dao.js';

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    const response = {
      restaurants: restaurantsList,
      page,
      filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };
    res.json(response);
  }

  static async apiGetRestaurantById(req, res, next) {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurant = await RestaurantsDAO.getRestaurantById(restaurantId);

      if (!restaurant) {
        res.status(404).json({ error: 'not found' });
      }

      res.json(restaurant);
    } catch (error) {
      console.error(`api: ${error}`);
      res.status(500).json({ error });
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      const cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (error) {
      console.error(`api: ${error}`);
      res.status(500).json({ error });
    }
  }
}
