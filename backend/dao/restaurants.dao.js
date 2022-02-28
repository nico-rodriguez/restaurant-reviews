import { ObjectId } from 'mongodb';

let restaurants;

export default class RestaurantsDAO {
  static async injectDB(connection) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await connection
        .db(process.env.RESTAURANTS_REVIEWS_NS)
        .collection('restaurants');
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in RestaurantsDAO: ${error}`
      );
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ('cuisine' in filters) {
        query = { cuisine: { $eq: filters['cuisine'] } };
      } else if ('zipcode' in filters) {
        query = { 'address.zipcode': { $eq: filters['zipcode'] } };
      }
    }

    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (error) {
      console.error(`Unable to issue find command: ${error}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);
    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${error}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantById(restaurantId) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(restaurantId),
          },
        },
        {
          $lookup: {
            from: 'reviews',
            let: {
              id: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$restaurant_id', '$$id'],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviews: '$reviews',
          },
        },
      ];

      return await restaurants.aggregate(pipeline).next();
    } catch (error) {
      console.error(`Something went wrong in getRestaurantById: ${error}`);
      throw error;
    }
  }

  static async getCuisines() {
    let cuisines = [];

    try {
      cuisines = await restaurants.distinct('cuisine');

      return cuisines;
    } catch (error) {
      console.error(`Unable to get cuisines: ${error}`);
      return cuisines;
    }
  }
}
