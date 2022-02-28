import mongodb from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

import app from './server.js';
import RestaurantsDAO from './dao/restaurants.dao.js';
import ReviewsDAO from './dao/reviews.dao.js';

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTAURANTS_REVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch(({ stack }) => {
    console.error(stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
