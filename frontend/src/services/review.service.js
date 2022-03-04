import http from './http-common';


class ReviewDataService {
  createReview(data, restaurantId) {
    return http.post(`${restaurantId}/reviews`, data);
  }

  updateReview(data, restaurantId, reviewId) {
    return http.put(`/${restaurantId}/reviews/${reviewId}`, data);
  }

  deleteReview(restaurantId, reviewId, userId) {
    return http.delete(`/${restaurantId}/reviews/${reviewId}?user_id=${userId}`);
  }
}

export default new ReviewDataService();