import http from './http-common';


class CuisineDataService {
  getCuisines() {
    return http.get('/cuisines');
  }
}

export default new CuisineDataService();