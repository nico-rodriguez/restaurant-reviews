exports = async function (request, response) {
  const reviews = context.services
    .get('mongodb-atlas')
    .db('sample_restaurants')
    .collection('reviews');
  const deleteResponse = await reviews.deleteOne({
    _id: BSON.ObjectId(request.query.id),
  });

  return deleteResponse;
};
