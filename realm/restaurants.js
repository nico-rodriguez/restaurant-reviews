exports = async function ({ query }, response) {
  const restaurantsPerPage = (query && query.restaurantsPerPage) || 20;
  const page = (query && query.page) || 0;

  let filter = {};
  if (query) {
    if (query.cuisine) {
      filter = { $text: { $search: query.cuisine } };
    } else if (query.zipcode) {
      filter = { 'address.zipcode': { $eq: query.zipcode } };
    } else if (query.name) {
      filter = { $text: { $search: query.name } };
    }
  }

  const collection = context.services
    .get('mongodb-atlas')
    .db('sample_restaurants')
    .collection('restaurants');
  const restaurantsList = await collection
    .find(filter)
    .skip(page * restaurantsPerPage)
    .limit(restaurantsPerPage)
    .toArray();

  restaurantsList.forEach((restaurant) => {
    restaurant._id = restaurant._id.toString();
  });

  const responseData = {
    restaurants: restaurantsList,
    page: page.toString(),
    filters: {},
    entries_per_page: restaurantsPerPage.toString(),
    total_results: restaurantsList.length.toString(),
  };

  return responseData;
};
