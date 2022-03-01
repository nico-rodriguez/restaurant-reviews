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

  createReview(data, restaurantId) {
    return http.post(`${restaurantId}/reviews`, data);
  }

  updateReview(data, restaurantId, reviewId) {
    return http.put(`/${restaurantId}/reviews/${reviewId}`, data);
  }

  deleteReview(restaurantId, reviewId, userId) {
    return http.delete(`/${restaurantId}/reviews/${reviewId}?user_id=${userId}`);
  }

  getCuisines() {
    return http.get('/cuisines');
  }
}

export default new RestaurantDataService();