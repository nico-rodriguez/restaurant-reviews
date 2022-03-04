import http from './http-common';


class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  getRestaurant(restaurantId) {
    return http.get(`/${restaurantId}`);
  }

  find(query, by = 'name', page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }
}

export default new RestaurantDataService();