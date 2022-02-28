import { ObjectId} from 'mongodb';

let reviews;

export default class ReviewsDAO {
  static async injectDB(connection) {
    if (reviews) {
      return;
    }

    try {
      reviews = await connection
        .db(process.env.RESTAURANTS_REVIEWS_NS)
        .collection('reviews');
    } catch (error) {
      console.error(`Unable to establish a connection in ReviewsDAO: ${error}`);
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };
      // console.log('HERE!!!');


      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      return { error };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: ObjectId(reviewId),
        },
        {
          $set: { text, date },
        }
      );

      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      return { error };
    }
  }
}
