exports = async function (request, response) {
  if (request.body) {
    const body = EJSON.parse(request.body.text());
    const reviews = context.services
      .get('mongodb-atlas')
      .db('sample_restaurants')
      .collection('reviews');

    const reviewDoc = {
      name: body.name,
      user_id: body.user_id,
      date: new Date(),
      text: body.text,
      restaurant_id: BSON.ObjectId(body.restaurant_id),
    };

    return await reviews.insertOne(reviewDoc);
  }

  return {};
};
